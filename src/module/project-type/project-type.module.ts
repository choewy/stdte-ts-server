import { Module } from '@nestjs/common';

import { ProjectTypeController } from './project-type.controller';
import { ProjectTypeService } from './project-type.service';

@Module({
  controllers: [ProjectTypeController],
  providers: [ProjectTypeService],
})
export class ProjectTypeModule {}
