import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [UsersModule]
})
export class PostsModule { }
