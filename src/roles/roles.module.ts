import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Role])],
    exports:[RolesService],
    providers: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}
