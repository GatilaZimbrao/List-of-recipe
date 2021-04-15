import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from 'src/database/entities/users.entity';
import { UsersService } from '../services/users.service';
import { IUsersParcialInfo } from '../typings/global';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/get-user/:login')
  getUser(@Param('login') login: string): Promise<Users> {
    return this.usersService.getUser(login);
  }

  @Post('/user')
  createUser(@Body() requestBody: any): Promise<IUsersParcialInfo> {
    return this.usersService.createUser(requestBody);
  }

  @Post('/login')
  userLogin(@Body() requestBody: any): Promise<string> {
    return this.usersService.loginUser(requestBody);
  }
}
