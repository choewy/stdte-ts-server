import { Controller, Get, Post } from '@nestjs/common';

import { TimeRecordService } from './time-record.service';

@Controller('time-records')
export class TimeRecordController {
  constructor(private readonly timeRecordService: TimeRecordService) {}

  @Get()
  async getTimeRecords() {
    return;
  }

  @Post()
  async updateTimeRecord() {
    return;
  }
}
