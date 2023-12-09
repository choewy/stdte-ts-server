import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { RoleService } from './role.service';
import { RoleCreateBodyDto, RoleListQueryDto, RoleParamDto, RoleUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Read })
  async getRoles(@Query() query: RoleListQueryDto) {
    return this.roleService.getRoles(query);
  }

  @Post()
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Write })
  async createRole(@Body() body: RoleCreateBodyDto) {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  async updateRole(@Param() param: RoleParamDto, @Body() body: RoleUpdateBodyDto) {
    return this.roleService.updateRole(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteRole(@Param() param: RoleParamDto) {
    return this.roleService.deleteRole(param);
  }
}
