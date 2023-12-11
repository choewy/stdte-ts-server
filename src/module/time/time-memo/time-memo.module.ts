import { Module } from '@nestjs/common';

import { TimeMemoController } from './time-memo.controller';
import { TimeMemoService } from './time-memo.service';

@Module({
  controllers: [TimeMemoController],
  providers: [TimeMemoService],
})
export class TimeMemoModule {}
