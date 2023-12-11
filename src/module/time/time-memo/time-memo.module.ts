import { Module } from '@nestjs/common';

import { TimeMemoController } from './time-memo.controller';
import { TimeMemoService } from './time-memo.service';
import { TimeMemoGateway } from './time-memo.gateway';

@Module({
  controllers: [TimeMemoController],
  providers: [TimeMemoGateway, TimeMemoService],
})
export class TimeMemoModule {}
