import { Module } from '@nestjs/common';

import { TimeProjectController } from './time-project.controller';
import { TimeProjectService } from './time-project.service';

@Module({
  controllers: [TimeProjectController],
  providers: [TimeProjectService],
})
export class TimeProjectModule {}
