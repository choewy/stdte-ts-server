import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { IndustryCategoryService } from './industry-category.service';
import {
  IndustryCategoryCreateBodyDto,
  IndustryCategoryListQueryDto,
  IndustryCategoryParamDto,
  IndustryCategoryUpdateBodyDto,
} from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('category/industry')
export class IndustryCategoryController {
  constructor(private readonly industryCategoryService: IndustryCategoryService) {}

  @Get()
  @SetRolePolicy({ industryCategory: RolePolicyLevel.Read })
  async getIndustryCategories(@Query() query: IndustryCategoryListQueryDto) {
    return this.industryCategoryService.getIndustryCategories(query);
  }

  @Get('download')
  @SetRolePolicy({ industryCategory: RolePolicyLevel.Read })
  async createIndustryCategoriesFile() {
    return this.industryCategoryService.createIndustryCategoriesFile();
  }

  @Post()
  @SetRolePolicy({ industryCategory: RolePolicyLevel.Create })
  async createIndustryCategory(@Body() body: IndustryCategoryCreateBodyDto) {
    return this.industryCategoryService.createIndustryCategory(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ industryCategory: RolePolicyLevel.Update })
  async updateIndustryCategory(@Param() param: IndustryCategoryParamDto, @Body() body: IndustryCategoryUpdateBodyDto) {
    return this.industryCategoryService.updateIndustryCategory(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ industryCategory: RolePolicyLevel.Delete })
  async deleteIndustryCategory(@Param() param: IndustryCategoryParamDto) {
    return this.industryCategoryService.deleteIndustryCategory(param);
  }
}
