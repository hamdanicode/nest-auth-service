import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FilterUserDto } from './dto/FilterUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from "bcrypt"
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entity/role.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) 
    private readonly userRepository:Repository<User>,private readonly roleService:RolesService){}
    
    getUser(filterUser:FilterUserDto):Promise<User[]>{
        return this.userRepository.find();
    }

    async getById(id:string):Promise<User>{
        return await this.userRepository.findOne({where:{id:id}})
    }

    async validateUser(email:string, password:string):Promise<User|null>{

        const userData= await this.userRepository.findOne({where:{
            email:email
        }})

        if(userData && (await userData.validatePassword(password)))return userData;
        return null
    }

    async insert(userDto:CreateUserDto):Promise<void>{
        const {name,password,email,username,role}=userDto;
        
        // check role id
        const roleData=await this.roleService.find(role);
        try{
        const user= this.userRepository.create();
        user.name=name;
        user.username=username;
        user.email=email;
        user.role=roleData;

        user.salt=await bcrypt.genSalt();
        user.password= await bcrypt.hash(password,user.salt);
        // console.log(user);
        
         await user.save();
        }catch(err){
            // kode error duplicat email
            if(err.code==='23505'){
                throw new ConflictException(`Email ${email} already used.`)
            }else{
                throw new InternalServerErrorException(err);
            }
            // console.log(err.code);
        }
        // return null
    }
}
