import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Permission } from "../enum/permission";
import { Transform } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class UpdateRoleAccessDto{

    @IsNotEmpty()
    @IsEnum(Permission)
    permission:number;

    @IsNotEmpty()
    @IsNumber()
    @Max(64)
    @Min(1)
    index:number;
}