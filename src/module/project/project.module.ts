import { Module } from '@nestjs/common';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectExcelService } from './project-excel.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectExcelService],
})
export class ProjectModule {}
