import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { UserPlan } from '../prisma/generated/prisma/enums.js';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@Body() body: { plan: UserPlan }, @Req() req: any) {
    const user = req.user;
    const data = await this.ordersService.create(body, user);
    return {
      data,
      success: true,
      message: "Create order success"
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const data = await this.ordersService.find(+id!);
    return {
      data,
      success: true,
      message: "Get order success"
    }
  }
}
