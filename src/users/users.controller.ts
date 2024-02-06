import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUserDto } from './dto/FilterUserDto';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Get()
    getBooks(@Query() filter:FilterUserDto){        
        return  this.userService.getUser(filter)
    }
    @Post()
    async create(@Body() userDto:CreateUserDto){
        return this.userService.insert(userDto);
    }
}
