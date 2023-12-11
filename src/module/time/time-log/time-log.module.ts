import { Module } from '@nestjs/common';

import { TimeLogController } from './time-log.controller';
import { TimeLogGateway } from './time-log.gateway';
import { TimeLogService } from './time-log.service';

@Module({
  controllers: [TimeLogController],
  providers: [TimeLogGateway, TimeLogService],
})
export class TimeLogModule {}
