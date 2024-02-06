import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PathesModule } from './pathes/pathes.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRoot(typeOrmConfig),UsersModule, PathesModule, RolesModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
