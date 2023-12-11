import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { BusinessCategoryService } from './business-category.service';
import {
  BusinessCategoryCreateBodyDto,
  BusinessCategoryListQueryDto,
  BusinessCategoryParamDto,
  BusinessCategoryUpdateBodyDto,
} from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('category/business')
export class BusinessCategoryController {
  constructor(private readonly businessCategoryService: BusinessCategoryService) {}

  @Get()
  @SetRolePolicy({ businessCategory: RolePolicyLevel.Read })
  async getBusinessCategories(@Query() query: BusinessCategoryListQueryDto) {
    return this.businessCategoryService.getBusinessCategories(query);
  }

  @Get(':id(\\d+)')
  @SetRolePolicy({ businessCategory: RolePolicyLevel.Read })
  async getBusinessCategory(@Param() param: BusinessCategoryParamDto) {
    return this.businessCategoryService.getBusinessCategory(param);
  }

  @Post()
  @SetRolePolicy({ businessCategory: RolePolicyLevel.Create })
  async createBusinessCategory(@Body() body: BusinessCategoryCreateBodyDto) {
    return this.businessCategoryService.createBusinessCategory(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ businessCategory: RolePolicyLevel.Update })
  async updateBusinessCategory(@Param() param: BusinessCategoryParamDto, @Body() body: BusinessCategoryUpdateBodyDto) {
    return this.businessCategoryService.updateBusinessCategory(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ businessCategory: RolePolicyLevel.Delete })
  async deleteBusinessCategory(@Param() param: BusinessCategoryParamDto) {
    return this.businessCategoryService.deleteBusinessCategory(param);
  }
}
