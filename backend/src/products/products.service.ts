import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class ProductsService {
    constructor(private readonly prismaService: PrismaService) { }

    findAll() {
        return this.prismaService.product.findMany();
    }

    async find(id: number) {
        const product = await this.prismaService.product.findUnique({
            where: {
                id
            }
        });
        if (!product) {
            throw new NotFoundException("Product not found");
        }
    }

    create(data: { name: string, price: number }) {
        return this.prismaService.product.create({
            data
        })
    }

    update(data: { name: string, price: number }, id: number) {
        return this.prismaService.product.update({
            where: {
                id
            },
            data
        })
    }

    delete(id: number) {
        return this.prismaService.product.delete({
            where: { id }
        })
    }
}
