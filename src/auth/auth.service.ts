import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { SignInDto } from './dto/signinDto';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { LoginResponse } from './interface/loginResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refreshToken.entity';
import { Repository } from 'typeorm';
import { RefreshAccessTokenDto } from './dto/refreshAccessTokenDto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService, 
        private readonly userService:UsersService,
        @InjectRepository(RefreshToken) private readonly refreshTokenRepo:Repository<RefreshToken>
        ){}

    async signIn(signInDto:SignInDto):Promise<LoginResponse>{

        const {email,password}=signInDto;
        const user=await this.userService.validateUser(email,password);
        if(!user){
            throw new UnauthorizedException("Wrong email or password")
        }

        const access_token=await this.createAccessToken(user)
        const refresh_token=await this.createRefreshToken(user)
        return {access_token,refresh_token} as LoginResponse;
    }

    async createAccessToken(user:User):Promise<string>{
        const payload={
            sub:user.id
        }

        const access_token= await this.jwtService.signAsync(payload)
        return access_token;
    }

    async createRefreshToken(user:User):Promise<string>{
      const  refreshToken=await this.saveRefreshToken(user,+refreshTokenConfig.expiresIn)
      const payload={jid:refreshToken.id}

    const refresh_token= await this.jwtService.signAsync(payload,refreshTokenConfig)
    return refresh_token;

    }
    async saveRefreshToken(user:User,ttl:number):Promise<RefreshToken>{

        const refreshToken=this.refreshTokenRepo.create()
        refreshToken.user=user
        refreshToken.isRevoked=false
        const expiredAt= new Date();
        expiredAt.setTime(expiredAt.getTime()+ttl)
        refreshToken.expiredAt=expiredAt;
        return await refreshToken.save()
    }

    async refreshAccessToken(refreshToken:RefreshAccessTokenDto):Promise<string>{
        const {refresh_token}=refreshToken;
        const paiload= await this.decodeToken(refresh_token);
        const isRefToken= await this.refreshTokenRepo.findOne({where:{id:paiload.jid}, relations:['user']})

        if (!isRefToken) throw new UnauthorizedException("Refresh token is not found");
        if (isRefToken.isRevoked) throw new UnauthorizedException("Refresh token has beed refoked");

        const access_token= await this.createAccessToken(isRefToken.user)

        return access_token; 
    }

    async decodeToken(token:string):Promise<any>{
        try {
            return await this.jwtService.verifyAsync(token)
        } catch (error) {
            if(error instanceof TokenExpiredError) {throw new UnauthorizedException("Refresh token is expired");}
            else {throw new InternalServerErrorException("Filed to decode token")}
        }
    }
}
