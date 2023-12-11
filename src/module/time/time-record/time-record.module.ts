import { Module } from '@nestjs/common';

import { TimeRecordController } from './time-record.controller';
import { TimeRecordService } from './time-record.service';
import { TimeRecordGateway } from './time-record.gateway';

@Module({
  controllers: [TimeRecordController],
  providers: [TimeRecordGateway, TimeRecordService],
})
export class TimeRecordModule {}
