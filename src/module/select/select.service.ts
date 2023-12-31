import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  BusinessCategoryQuery,
  CustomerQuery,
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
  SelectCustomerDto,
} from './dto';

@Injectable()
export class SelectService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: ListQueryDto) {
    const userQuery = new UserQuery(this.dataSource);

    return new ListDto(query, await userQuery.findUserSelectList(query), SelectUserDto);
  }

  async getRoles(query: ListQueryDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    return new ListDto(query, await roleQuery.findRoleList(query), SelectRoleDto);
  }

  async getCustomers(query: ListQueryDto) {
    const customerQuery = new CustomerQuery(this.dataSource);

    return new ListDto(query, await customerQuery.findCustomerSelectList(query), SelectCustomerDto);
  }

  async getBusinessCategories(query: ListQueryDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);

    return new ListDto(query, await businessCategoryQuery.findBusinessCategoryList(query), SelectBusinessCategoryDto);
  }

  async getIndustryCategories(query: ListQueryDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);

    return new ListDto(query, await industryCategoryQuery.findIndustryCategoryList(query), SelectIndustryCategoryDto);
  }

  async getTaskCategories(query: ListQueryDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);

    return new ListDto(query, await taskMainCategoryQuery.findTaskMainCategoryList(query), SelectTaskCategoryDto);
  }
}
