import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service.js';
import { UsersService } from '../users/users.service.js';
import { UserPlan } from '../prisma/generated/prisma/enums.js';

@Injectable()
export class PaymentService {
    constructor(private readonly orderService: OrdersService, private readonly userService: UsersService) { }
    async webhookAuto({ transferType, transferAmount, content }: { transferType: string, content: string, transferAmount: string }, apiKey: string) {
        if (apiKey !== process.env.SEPAY_API_KEY) {
            throw new UnauthorizedException();
        }

        const pattern = /UNI(\d+)/;
        const orderMatch = content.match(pattern);
        if (orderMatch?.[1]) {
            const orderId = +orderMatch?.[1];

            const order = await this.orderService.find(orderId);

            if (!order) {
                throw new NotFoundException();
            }

            if (order.total === +transferAmount && transferType === "in" && order.status === 'PENDING') {

                console.log('a');

                await this.orderService.updateStatus(orderId, "COMPLETED");
                console.log('b');
                await this.userService.updatePlan(order.userId, order.plan);

                return;
            }

        }

        throw new InternalServerErrorException();
    }
}
