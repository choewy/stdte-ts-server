import { Module } from '@nestjs/common';

import { ProjectOptionController } from './project-option.controller';
import { ProjectOptionService } from './project-option.service';

@Module({
  controllers: [ProjectOptionController],
  providers: [ProjectOptionService],
})
export class ProjectOptionModule {}
