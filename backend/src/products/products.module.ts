import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [UsersModule]
})
export class ProductsModule { }
