import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signinDto';
import { RefreshAccessTokenDto } from './dto/refreshAccessTokenDto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("login")
    async SignInDto(@Body() signInDto:SignInDto){
        return this.authService.signIn(signInDto);
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshAccessTokenDto:RefreshAccessTokenDto){
        return this.authService.refreshAccessToken(refreshAccessTokenDto);
    }
}
