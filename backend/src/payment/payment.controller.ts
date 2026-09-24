import { Body, Controller, Post, Req } from '@nestjs/common';
import { PaymentService } from './payment.service.js';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('webhook')
  async webhookAuto(@Body() body: { transferType: string, content: string, transferAmount: string }, @Req() req: any) {
    const apiKey = req.headers.authorization?.split(' ').at(-1);
    await this.paymentService.webhookAuto(body, apiKey);

    return {
      success: true,
    }

  }
}
