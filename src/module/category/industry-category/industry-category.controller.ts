import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { IndustryCategoryService } from './industry-category.service';
import {
  IndustryCategoryCreateBodyDto,
  IndustryCategoryListQueryDto,
  IndustryCategoryParamDto,
  IndustryCategoryUpdateBodyDto,
} from './dto';

@Controller('category/industry')
export class IndustryCategoryController {
  constructor(private readonly industryCategoryService: IndustryCategoryService) {}

  @Get()
  async getIndustryCategories(@Query() query: IndustryCategoryListQueryDto) {
    return this.industryCategoryService.getIndustryCategories(query);
  }

  @Get(':id(\\d+)')
  async getIndustryCategory(@Param() param: IndustryCategoryParamDto) {
    return this.industryCategoryService.getIndustryCategory(param);
  }

  @Post()
  async createIndustryCategory(@Body() body: IndustryCategoryCreateBodyDto) {
    return this.industryCategoryService.createIndustryCategory(body);
  }

  @Patch(':id(\\d+)')
  async updateIndustryCategory(@Param() param: IndustryCategoryParamDto, @Body() body: IndustryCategoryUpdateBodyDto) {
    return this.industryCategoryService.updateIndustryCategory(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteIndustryCategory(@Param() param: IndustryCategoryParamDto) {
    return this.industryCategoryService.deleteIndustryCategory(param);
  }
}
