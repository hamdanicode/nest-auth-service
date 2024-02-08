import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PathesModule } from './pathes/pathes.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRoot(typeOrmConfig),UsersModule, PathesModule, RolesModule, AuthModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
