import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { ListDto, ListQueryDto, RoleQuery, UserQuery } from '@server/common';

import { SelectUserDto, SelectRoleDto } from './dto';

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
}
