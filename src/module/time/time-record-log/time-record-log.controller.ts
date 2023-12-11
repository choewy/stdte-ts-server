import { Controller, Get } from '@nestjs/common';

import { TimeRecordLogService } from './time-record-log.service';

@Controller('time/log')
export class TimeRecordLogController {
  constructor(private readonly timeRecordLogService: TimeRecordLogService) {}

  @Get()
  async getTimeRecordLogs() {
    return this.timeRecordLogService.getTimeRecordLogs();
  }
}
