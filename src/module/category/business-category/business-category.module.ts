import { Module } from '@nestjs/common';

import { BusinessCategoryController } from './business-category.controller';
import { BusinessCategoryService } from './business-category.service';

@Module({
  controllers: [BusinessCategoryController],
  providers: [BusinessCategoryService],
})
export class BusinessCategoryModule {}
