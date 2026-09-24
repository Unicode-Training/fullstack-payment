import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    findAll() {
        return this.prismaService.post.findMany();
    }

    async find(id: number) {
        const post = await this.prismaService.post.findUnique({
            where: {
                id
            }
        });
        if (!post) {
            throw new NotFoundException("Product not found");
        }
    }

    create(data: { title: string, content: string }) {
        return this.prismaService.post.create({
            data
        })
    }

    update(data: { title: string, content: string }, id: number) {
        return this.prismaService.post.update({
            where: {
                id
            },
            data
        })
    }

    delete(id: number) {
        return this.prismaService.post.delete({
            where: { id }
        })
    }
}
