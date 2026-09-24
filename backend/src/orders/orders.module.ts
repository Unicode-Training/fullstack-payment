import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  imports: [UsersModule],
  exports: [OrdersService]
})
export class OrdersModule { }
