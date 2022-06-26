import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async list(): Promise<User[]> {
    return await this.userService.find();
  }

  @Post()
  async create(@Body() body): Promise<User> {
    const { email, password } = body;
    return await this.userService.create(email, password);
  }
}
