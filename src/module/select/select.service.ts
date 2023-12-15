import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  BusinessCategoryQuery,
  IndustryCategoryQuery,
  ListDto,
  ListQueryDto,
  RoleQuery,
  TaskMainCategoryQuery,
  UserQuery,
} from '@server/common';

import {
  SelectUserDto,
  SelectRoleDto,
  SelectBusinessCategoryDto,
  SelectIndustryCategoryDto,
  SelectTaskCategoryDto,
} from './dto';

@Injectable()
export class SelectService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: ListQueryDto) {
    const userQuery = new UserQuery(this.dataSource);

    return new ListDto(query, await userQuery.findUserSelectListOrderByName(query), SelectUserDto);
  }

  async getRoles(query: ListQueryDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    return new ListDto(query, await roleQuery.findRoleSelectListOrderByName(query), SelectRoleDto);
  }

  async getBusinessCategories(query: ListQueryDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);

    return new ListDto(
      query,
      await businessCategoryQuery.findBusinessCategorySelectListOrderByName(query),
      SelectBusinessCategoryDto,
    );
  }

  async getIndustryCategories(query: ListQueryDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);

    return new ListDto(
      query,
      await industryCategoryQuery.findIndustryCategorySelectListOrderByName(query),
      SelectIndustryCategoryDto,
    );
  }

  async getTaskCategories(query: ListQueryDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);

    return new ListDto(
      query,
      await taskMainCategoryQuery.findTaskMainCategorySelectListOrderByName(query),
      SelectTaskCategoryDto,
    );
  }
}
