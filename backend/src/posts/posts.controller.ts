import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { RoleGuard } from '../guards/role/role.guard.js';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  @UseGuards(RoleGuard('posts.read'))
  async findAll() {
    const data = await this.postsService.findAll();
    return {
      data,
      success: true,
      message: "Get posts success"
    }
  }

  @Get('/:id')
  @UseGuards(RoleGuard('posts.read'))
  async find(@Param('id') id: number) {
    const data = await this.postsService.find(+id!);
    return {
      data,
      success: true,
      message: "Get post success"
    }
  }

  @Post()
  @UseGuards(RoleGuard('posts.create'))
  async create(@Body() body: { title: string, content: string }) {
    const data = await this.postsService.create(body);
    return {
      data,
      success: true,
      message: "Create post success"
    }
  }

  @Put('/:id')
  @UseGuards(RoleGuard('posts.update'))
  async update(@Body() body: { title: string, content: string }, @Param('id') id: number) {
    const data = await this.postsService.update(body, +id!);
    return {
      data,
      success: true,
      message: "Update post success"
    }
  }

  @Delete('/:id')
  @UseGuards(RoleGuard('posts.delete'))
  async delete(@Param('id') id: number) {
    const data = await this.postsService.delete(+id!);
    return {
      data,
      success: true,
      message: "Delete post success"
    }
  }
}
