import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserToken } from 'src/decorators/token-user.decorator';
import { Jwt } from 'jsonwebtoken';
import { ITokenUser } from 'src/utils/types';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user : CreateUserDto) {
    return this.userService.create(user);
  }

  @Get()
  findAll(
    @Query('role') role: string, 
    @Query('page', ParseIntPipe) page: number, 
    @Query('take', ParseIntPipe) take: number) {
    return this.userService.findAll({page, take, role});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {    
    return this.userService.remove(id);
  }
}
