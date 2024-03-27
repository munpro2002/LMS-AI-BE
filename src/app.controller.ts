import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }
}
