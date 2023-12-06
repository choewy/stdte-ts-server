import { Module } from '@nestjs/common';

import { TimeRecordController } from './time-record.controller';
import { TimeRecordService } from './time-record.service';

@Module({
  controllers: [TimeRecordController],
  providers: [TimeRecordService],
})
export class TimeRecordModule {}
