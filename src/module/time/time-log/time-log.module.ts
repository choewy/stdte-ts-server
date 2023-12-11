import { Module } from '@nestjs/common';

import { TimeLogController } from './time-log.controller';
import { TimeLogService } from './time-log.service';

@Module({
  controllers: [TimeLogController],
  providers: [TimeLogService],
})
export class TimeLogModule {}
