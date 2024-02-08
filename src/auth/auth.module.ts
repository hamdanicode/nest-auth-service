import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refreshToken.entity';

@Module({
  imports:[JwtModule.register(jwtConfig),TypeOrmModule.forFeature([RefreshToken]),UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}