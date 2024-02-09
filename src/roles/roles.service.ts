import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRoleDto';
import slugify from 'slugify';
import { UpdateRoleAccessDto } from './dto/updateRoleAccessDto';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private readonly roleRopository:Repository<Role>,private configService:ConfigService){}

    async getAll():Promise<Role[]>{

        return await this.roleRopository.find()

    }

    async create(createRoleDto:CreateRoleDto):Promise<void>{
        const {name}=createRoleDto;
        
        try {
           const roleRepo= this.roleRopository.create();
           roleRepo.name=name;
           roleRepo.slug= slugify(name.toLowerCase());
           roleRepo.access= this.makeCodeAccess();
           await roleRepo.save()
        } catch (error) {
            throw new ConflictException(`Name ${name} already used.`)
        }
    }

    async remove(id:string):Promise<void>{
        try{
            this.roleRopository.delete(id)
        }catch(e){
            throw new InternalServerErrorException(e)
        }
    }

    async updateAccess(id:string,updateRoleAccessDto:UpdateRoleAccessDto):Promise<void>{
        // log();
        const{permission,index}=updateRoleAccessDto;
        const roleData = await this.find(id);
        roleData.access= this.setCharAt(roleData.access,index-1,permission)
        await roleData.save();
    }

    async find(id:string):Promise<Role|null>{
        const data=await this.roleRopository.findOne({where:{
            id:id
        }});
        if(data){
            return data;
        }
        return null;
    }

    setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    makeCodeAccess():string{
        const maxRbacUrl:number= this.configService.get('MAX_RBAC_URL');
        let str="";
        for(let i:number=maxRbacUrl;i>0;i--){
            str+="0"
        }
        return str;
    }
}
