import { Module } from '@nestjs/common';

import { TimeRecordModule } from './time-record';
import { TimeRecordLogModule } from './time-record-log';
import { TimeMemoModule } from './time-memo';
import { TimeProjectModule } from './time-project';

@Module({
  imports: [TimeRecordModule, TimeRecordLogModule, TimeMemoModule, TimeProjectModule],
})
export class TimeModule {}
