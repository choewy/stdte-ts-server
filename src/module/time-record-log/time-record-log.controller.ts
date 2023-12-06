import { Controller, Get } from '@nestjs/common';

import { TimeRecordLogService } from './time-record-log.service';

@Controller('time-record-log')
export class TimeRecordLogController {
  constructor(private readonly timeRecordLogService: TimeRecordLogService) {}

  @Get()
  async getTimeLogsByMyTeam() {
    return;
  }
}
