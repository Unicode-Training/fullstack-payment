import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }
  getHello() {
    return this.prismaService.user.findMany();
  }
}
