import { UserService } from '@/application/services/user.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(@Inject(UserService) private userService: UserService) {}

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get('/:id')
    async getOneUser(@Param('id') id: string) {
        return await this.userService.getOneUser(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}
