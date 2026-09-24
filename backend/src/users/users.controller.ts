import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { RoleGuard } from '../guards/role/role.guard.js';
import { UserStatus, UserType } from '../prisma/generated/prisma/enums.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(RoleGuard('users.read'))
  async findAll(@Query() query: { type: UserType }) {
    const data = await this.usersService.findAll(query);
    return {
      data,
      success: true,
      message: "Get users success"
    }
  }

  @Get('/:id')
  @UseGuards(RoleGuard('users.read'))
  async find(@Param('id') id: number) {
    const data = await this.usersService.find(+id!);
    return {
      data,
      success: true,
      message: "Get usere success"
    }
  }

  @Post()
  @UseGuards(RoleGuard('users.create'))
  async create(@Body() body: { name: string, email: string, password: string, status: UserStatus, type: UserType }) {
    const data = await this.usersService.create(body);
    return {
      data,
      success: true,
      message: "Create usere success"
    }
  }

  @Put('/:id')
  @UseGuards(RoleGuard('users.update'))
  async update(@Body() body: { name: string, email: string, password: string, status: UserStatus, type: UserType }, @Param('id') id: number) {
    const data = await this.usersService.update(body, +id!);
    return {
      data,
      success: true,
      message: "Update user success"
    }
  }

  @Delete('/:id')
  @UseGuards(RoleGuard('users.delete'))
  async delete(@Param('id') id: number) {
    const data = await this.usersService.delete(+id!);
    return {
      data,
      success: true,
      message: "Delete user success"
    }
  }

  @Put('/:id/permissions')
  @UseGuards(RoleGuard('ADMIN'))
  async syncPermissions(@Body() permissions: string[], @Param('id') id: number) {
    await this.usersService.syncPermissions(permissions, +id!);
    return {
      success: true,
      message: "Sync permissions success"
    }
  }

  @Get('/:id/permissions')
  @UseGuards(RoleGuard('ADMIN'))
  async getPermissions(@Param('id') id: number) {
    const data = await this.usersService.getPermissions(+id!);
    return {
      data,
      success: true,
      message: "Get permissions success"
    }
  }
}
