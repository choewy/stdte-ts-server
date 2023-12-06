import { Module } from '@nestjs/common';

import { TimeRecordMemoController } from './time-record-memo.controller';
import { TimeRecordMemoService } from './time-record-memo.service';

@Module({
  controllers: [TimeRecordMemoController],
  providers: [TimeRecordMemoService],
})
export class TimeRecordMemoModule {}
