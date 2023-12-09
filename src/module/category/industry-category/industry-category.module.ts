import { Module } from '@nestjs/common';

import { IndustryCategoryController } from './industry-category.controller';
import { IndustryCategoryService } from './industry-category.service';

@Module({
  controllers: [IndustryCategoryController],
  providers: [IndustryCategoryService],
})
export class IndustryCategoryModule {}
