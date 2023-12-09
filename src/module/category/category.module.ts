import { Module } from '@nestjs/common';

import { BusinessCategoryModule } from './business-category';
import { IndustryCategoryModule } from './industry-category';

@Module({
  imports: [BusinessCategoryModule, IndustryCategoryModule],
})
export class CategoryModule {}
