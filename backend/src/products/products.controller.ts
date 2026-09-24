import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { RoleGuard } from '../guards/role/role.guard.js';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @UseGuards(RoleGuard('products.read'))
  async findAll() {
    const data = await this.productsService.findAll();
    return {
      data,
      success: true,
      message: "Get products success"
    }
  }

  @Get('/:id')
  @UseGuards(RoleGuard('products.read'))
  async find(@Param('id') id: number) {
    const data = await this.productsService.find(+id!);
    return {
      data,
      success: true,
      message: "Get product success"
    }
  }

  @Post()
  @UseGuards(RoleGuard('products.create'))
  async create(@Body() body: { name: string, price: number }) {
    const data = await this.productsService.create(body);
    return {
      data,
      success: true,
      message: "Create product success"
    }
  }

  @Put('/:id')
  @UseGuards(RoleGuard('products.update'))
  async update(@Body() body: { name: string, price: number }, @Param('id') id: number) {
    const data = await this.productsService.update(body, +id!);
    return {
      data,
      success: true,
      message: "Update product success"
    }
  }

  @Delete('/:id')
  @UseGuards(RoleGuard('products.delete'))
  async delete(@Param('id') id: number) {
    const data = await this.productsService.delete(+id!);
    return {
      data,
      success: true,
      message: "Delete product success"
    }
  }
}
