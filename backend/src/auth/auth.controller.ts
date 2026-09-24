import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() { email, password }: { email: string, password: string }) {
    const data = await this.authService.login(email, password);
    return {
      success: true,
      message: "Login success",
      data
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  profile(@Req() request: any) {
    return request.user;
  }
}
