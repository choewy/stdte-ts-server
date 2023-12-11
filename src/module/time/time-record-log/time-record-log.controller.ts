import { Controller, Get, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { TimeRecordLogService } from './time-record-log.service';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('record/log')
export class TimeRecordLogController {
  constructor(private readonly timeRecordLogService: TimeRecordLogService) {}

  @Get()
  async getTimeRecordLogs() {
    return this.timeRecordLogService.getTimeRecordLogs();
  }
}
