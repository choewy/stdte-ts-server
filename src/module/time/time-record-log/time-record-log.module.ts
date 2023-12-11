import { Module } from '@nestjs/common';

import { TimeRecordLogController } from './time-record-log.controller';
import { TimeRecordLogService } from './time-record-log.service';

@Module({
  controllers: [TimeRecordLogController],
  providers: [TimeRecordLogService],
})
export class TimeRecordLogModule {}
