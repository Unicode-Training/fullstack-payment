import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { PaymentController } from './payment.controller.js';
import { OrdersModule } from '../orders/orders.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [OrdersModule, UsersModule]
})
export class PaymentModule { }
