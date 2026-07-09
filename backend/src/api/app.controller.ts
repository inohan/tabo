import { Controller, Get, HttpCode } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @AllowAnonymous()
  @HttpCode(204)
  getHealth(): void {
    return;
  }
}
