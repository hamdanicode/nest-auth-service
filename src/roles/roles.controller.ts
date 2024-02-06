import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RolesService } from './roles.service';
import { log } from 'console';
import { UpdateRoleAccessDto } from './dto/updateRoleAccessDto';

@Controller('roles')
export class RolesController {

    constructor(private roleService:RolesService){}

    @Get()
    getAll(){
        return "index";
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
