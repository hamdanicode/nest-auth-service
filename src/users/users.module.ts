import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),RolesModule],
  exports:[],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
