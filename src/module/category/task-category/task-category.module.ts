import { Module } from '@nestjs/common';

import { TaskCategoryController } from './task-category.controller';
import { TaskCategoryService } from './task-category.service';

@Module({
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
})
export class TaskCategoryModule {}
