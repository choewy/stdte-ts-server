import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ListQueryDto, RolePolicyScopeValue } from '@server/common';
import { UseSignGuard, UseRoleGuard } from '@server/core';

import { GetRoleParamDto } from './dto';
import { RoleService } from './role.service';

@UseSignGuard()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseRoleGuard({ accessRole: RolePolicyScopeValue.Read })
  async getRoleList(@Query() query: ListQueryDto) {
    return;
  }

  @Post()
  async createRole() {
    return;
  }

  @Patch(':id(\\d+)')
  async updateRole(@Param() param: GetRoleParamDto) {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteRole(@Param() param: GetRoleParamDto) {
    return;
  }
}
