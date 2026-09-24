import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { RoleStatus } from '../prisma/generated/prisma/enums.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { RoleGuard } from '../guards/role/role.guard.js';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get()
  @UseGuards(RoleGuard('ADMIN'))
  async findAll() {
    const data = await this.rolesService.findAll();
    return {
      data,
      success: true,
      message: "Get roles success"
    }
  }

  @Get('/:id')
  @UseGuards(RoleGuard('ADMIN'))
  async find(@Param('id') id: number) {
    const data = await this.rolesService.find(+id!);
    return {
      data,
      success: true,
      message: "Get roles success"
    }
  }

  @Post()
  @UseGuards(RoleGuard('ADMIN'))
  async create(@Body() body: { name: string, status: RoleStatus }) {
    const data = await this.rolesService.create(body);
    return {
      data,
      success: true,
      message: "Create role success"
    }
  }

  @Put('/:id')
  @UseGuards(RoleGuard('ADMIN'))
  async update(@Body() body: { name: string, status: RoleStatus }, @Param('id') id: number) {

    const data = await this.rolesService.update(body, +id!);
    return {
      data,
      success: true,
      message: "Update role success"
    }
  }

  @Delete('/:id')
  @UseGuards(RoleGuard('ADMIN'))
  async delete(@Param('id') id: number) {
    const data = await this.rolesService.delete(+id!);
    return {
      data,
      success: true,
      message: "Delete role success"
    }
  }

  @Put('/:id/permissions')
  @UseGuards(RoleGuard('ADMIN'))
  async permissions(@Body() permissions: string[], @Param('id') id: number) {
    await this.rolesService.syncPermssions(permissions, +id!);
    return {
      success: true,
      message: "Sync permissions success"
    }
  }

  @Put('/:id/users')
  @UseGuards(RoleGuard('ADMIN'))
  async users(@Body() usersId: number[], @Param('id') id: number) {
    await this.rolesService.syncUsers(usersId, +id!);
    return {
      success: true,
      message: "Sync users success"
    }
  }

  @Get('/:id/users')
  @UseGuards(RoleGuard('ADMIN'))
  async getUsersByRole(@Param('id') id: number) {
    const data = await this.rolesService.getUsersByRole(+id!);
    return {
      data,
      success: true,
      message: "Get user by role success"
    }
  }
}
