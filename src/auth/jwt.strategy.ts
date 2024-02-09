import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/jwt.config";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
          })
    }

    async validate(payload: any) {
        const user= this.userService.getById(payload.sub);
        if(!user) throw new UnauthorizedException("User is not found.")
        return user;
    }
}