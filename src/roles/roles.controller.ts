import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RolesService } from './roles.service';
import { log } from 'console';
import { UpdateRoleAccessDto } from './dto/updateRoleAccessDto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('roles')
@UseGuards(JwtGuard)
export class RolesController {

    constructor(private roleService:RolesService){}

    @Get()
    async getAll(@GetUser() user:User){
        // console.log(user);
        return this.roleService.getAll();
    }

    @Post()
    async create(@Body() createRoleDTO:CreateRoleDto){
        log(createRoleDTO);
        return this.roleService.create(createRoleDTO);
    }

    @Put(":id/access")
    async updateAccess(@Param('id') id:string,@Body() updateRoleAccessDto:UpdateRoleAccessDto){
        // log(updateRoleAccessDto);
        return this.roleService.updateAccess(id,updateRoleAccessDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.roleService.remove(id)
    }  
}
