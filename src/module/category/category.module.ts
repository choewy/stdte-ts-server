import { Module } from '@nestjs/common';

import { BusinessCategoryModule } from './business-category';
import { IndustryCategoryModule } from './industry-category';
import { TaskCategoryModule } from './task-category';

@Module({
  imports: [BusinessCategoryModule, IndustryCategoryModule, TaskCategoryModule],
})
export class CategoryModule {}
