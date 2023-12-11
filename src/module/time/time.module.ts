import { Module } from '@nestjs/common';

import { TimeRecordModule } from './time-record';
import { TimeLogModule } from './time-log';
import { TimeMemoModule } from './time-memo';
import { TimeProjectModule } from './time-project';

@Module({
  imports: [TimeRecordModule, TimeLogModule, TimeMemoModule, TimeProjectModule],
})
export class TimeModule {}
