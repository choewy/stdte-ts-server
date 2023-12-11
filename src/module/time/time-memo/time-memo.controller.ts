import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { Request } from '@server/common';

import { TimeMemoService } from './time-memo.service';
import { TimeMemoListBodyDto, TimeMemoParamDto, TimeMemoUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('record/memo')
export class TimeMemoController {
  constructor(private readonly timeMemoService: TimeMemoService) {}

  @Post()
  async getTimeMemos(body: TimeMemoListBodyDto) {
    return this.timeMemoService.getTimeMemos(body);
  }

  @Patch()
  async updateTimeMemo(@Req() req: Request, @Body() body: TimeMemoUpdateBodyDto) {
    return this.timeMemoService.updateTimeMemo(req.userId, body);
  }

  @Delete()
  async deleteTimeMemo(@Req() req: Request, @Param() param: TimeMemoParamDto) {
    return this.timeMemoService.deleteTimeMemo(req.userId, param);
  }
}
