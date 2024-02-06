import { IsEmail,  IsNotEmpty, Validate } from "class-validator";
import { Column} from "typeorm";


export class CreateUserDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    username:string;
    
    @IsNotEmpty()
    @IsEmail()
    @Column({unique:true})
    email:string;
    
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    role:string;

}