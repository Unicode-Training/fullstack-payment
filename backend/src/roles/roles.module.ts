import { Module } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { RolesController } from './roles.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
  imports: [UsersModule]
})
export class RolesModule { }
