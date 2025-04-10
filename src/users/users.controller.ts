import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register') // POST /user/register
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Post('login')// POST /user/login
  login(@Body() user: LoginUserDto, @Res() res: Response) {
    return this.usersService.login(user, res);
  }

  @Post('logout')//POST /user/logout
  logout(@Res() res: Response) {
    return this.usersService.logout(res);
  }

  @ApiQuery({ name: 'role', required: false })
  @Get('all') //GET /user/all?role=user
  findAll(@Query('role') role?: "user" | "admin") {
    return this.usersService.findAll(role);
  }

  @Get('profile') //GET /user/profile
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req)
  }

  @Get(':username')//GET /user/username_here
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username)
  }

  @Patch(':username')// PATCH /user/username_here
  update(@Param('username') username: string, @Body() updateDetails: UpdateUserDto) {
    return this.usersService.update(username, updateDetails)
  }

  @Delete(':username')// DELETE /users/username_here
  deleteByUsername(@Param('username') username: string) {
    return this.usersService.deleteByUsername(username);
  }
}
