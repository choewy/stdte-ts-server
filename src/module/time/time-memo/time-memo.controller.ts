import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard } from '@server/core';

import { Request } from '@server/common';

import { TimeMemoService } from './time-memo.service';
import { TimeMemoListBodyDto, TimeMemoParamDto, TimeMemoUpsertBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('record/memo')
export class TimeMemoController {
  constructor(private readonly timeMemoService: TimeMemoService) {}

  @Post()
  async getTimeMemos(@Body() body: TimeMemoListBodyDto) {
    return this.timeMemoService.getTimeMemos(body);
  }

  @Patch()
  async upsertTimeMemo(@Req() req: Request, @Body() body: TimeMemoUpsertBodyDto) {
    return this.timeMemoService.upsertTimeMemo(req.userId, body);
  }

  @Delete(':id(\\d+)')
  async deleteTimeMemo(@Req() req: Request, @Param() param: TimeMemoParamDto) {
    return this.timeMemoService.deleteTimeMemo(req.userId, param);
  }
}
