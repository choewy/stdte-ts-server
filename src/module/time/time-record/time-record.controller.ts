import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from '@server/common';
import { CredentialsGuard, JwtGuard } from '@server/core';

import { TimeRecordService } from './time-record.service';
import { TimeRecordListBodyDto, TimeRecordUpsertBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('record/time')
export class TimeRecordController {
  constructor(private readonly timeRecordService: TimeRecordService) {}

  @Post()
  async getTimeRecords(@Body() body: TimeRecordListBodyDto) {
    return this.timeRecordService.getTimeRecords(body);
  }

  @Patch()
  async upsertTimeRecord(@Req() req: Request, @Body() body: TimeRecordUpsertBodyDto) {
    return this.timeRecordService.upsertTimeRecord(req.userId, body);
  }
}
