import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { BusinessCategoryService } from './business-category.service';
import {
  BusinessCategoryCreateBodyDto,
  BusinessCategoryListQueryDto,
  BusinessCategoryParamDto,
  BusinessCategoryUpdateBodyDto,
} from './dto';

@Controller('category/business')
export class BusinessCategoryController {
  constructor(private readonly businessCategoryService: BusinessCategoryService) {}

  @Get()
  async getBusinessCategories(@Query() query: BusinessCategoryListQueryDto) {
    return this.businessCategoryService.getBusinessCategories(query);
  }

  @Get(':id(\\d+)')
  async getBusinessCategory(@Param() param: BusinessCategoryParamDto) {
    return this.businessCategoryService.getBusinessCategory(param);
  }

  @Post()
  async createBusinessCategory(@Body() body: BusinessCategoryCreateBodyDto) {
    return this.businessCategoryService.createBusinessCategory(body);
  }

  @Patch(':id(\\d+)')
  async updateBusinessCategory(@Param() param: BusinessCategoryParamDto, @Body() body: BusinessCategoryUpdateBodyDto) {
    return this.businessCategoryService.updateBusinessCategory(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteBusinessCategory(@Param() param: BusinessCategoryParamDto) {
    return this.businessCategoryService.deleteBusinessCategory(param);
  }
}
