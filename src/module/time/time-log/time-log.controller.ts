import { Controller, Get, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard } from '@server/core';

import { TimeLogService } from './time-log.service';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('record/log')
export class TimeLogController {
  constructor(private readonly timeLogService: TimeLogService) {}

  @Get()
  async getTimeLogs() {
    return this.timeLogService.getTimeLogs();
  }
}
