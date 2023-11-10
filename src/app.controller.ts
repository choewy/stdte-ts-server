import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'get version' })
  @ApiOkResponse({ type: String })
  getVersion(): string {
    return this.appService.getVersion();
  }
}
