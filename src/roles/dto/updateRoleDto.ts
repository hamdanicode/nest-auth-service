import { IsNotEmpty } from "class-validator";

export class UpdateRoleAccessDto{
    @IsNotEmpty()
    name:string;
}