import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { OrderStatus, UserPlan } from '../prisma/generated/prisma/enums.js';
import plans from "../data/plan.json" with {type: 'json'};
import { User } from '../prisma/generated/prisma/client.js';
import { UsersService } from '../users/users.service.js';
const getPlan = (plan: string) => plans.find((val) => val.name === plan)
@Injectable()
export class OrdersService {
    constructor(private readonly prismaService: PrismaService) { }
    async create(body: { plan: UserPlan }, user: User) {
        const plan = getPlan(body.plan);
        const userId = user.id;
        if (!plan?.price || body.plan === user.plan) {
            throw new ForbiddenException();
        }
        const order = await this.prismaService.order.create({
            data: {
                userId,
                plan: plan?.name as UserPlan,
                total: plan?.price!
            }
        });

        return {
            ...order,
            paymentUrl: `https://img.vietqr.io/image/OCB-SBSEPAYZEBRGJQ75CGD-compact2.png?amount=${order.total}&accountName=PHAM+XUAN+TUNG&addInfo=UNI${order.id}`
        }
    }

    find(id: number) {
        return this.prismaService.order.findUnique({
            where: { id }
        })
    }

    async updateStatus(id: number, status: OrderStatus) {
        const order = await this.prismaService.order.update({
            where: { id },
            data: {
                status
            }
        });

        return order;
    }
}
