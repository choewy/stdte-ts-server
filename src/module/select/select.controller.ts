import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ListQueryDto } from '@server/common';
import { CredentialsGuard, JwtGuard } from '@server/core';

import { SelectService } from './select.service';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('select')
export class SelectController {
  constructor(private readonly selectService: SelectService) {}

  @Get('users')
  async getUsers(@Query() query: ListQueryDto) {
    return this.selectService.getUsers(query);
  }

  @Get('roles')
  async getRoles(@Query() query: ListQueryDto) {
    return this.selectService.getRoles(query);
  }

  @Get('category/businesses')
  async getBusinessCategories(@Query() query: ListQueryDto) {
    return this.selectService.getBusinessCategories(query);
  }

  @Get('category/industries')
  async getIndustryCategories(@Query() query: ListQueryDto) {
    return this.selectService.getIndustryCategories(query);
  }

  @Get('category/tasks')
  async getTaskCategories(@Query() query: ListQueryDto) {
    return this.selectService.getTaskCategories(query);
  }
}
