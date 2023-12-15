import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { RoleService } from './role.service';
import { RoleCreateBodyDto, RoleListQueryDto, RoleParamDto, RoleUpdateBodyDto, RoleUpdateUsersBodyDto } from './dto';

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
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Create })
  async createRole(@Body() body: RoleCreateBodyDto) {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Update })
  async updateRole(@Param() param: RoleParamDto, @Body() body: RoleUpdateBodyDto) {
    return this.roleService.updateRole(param, body);
  }

  @Put(':id(\\d+)/users')
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Update })
  async updateRoleUsers(@Param() param: RoleParamDto, @Body() body: RoleUpdateUsersBodyDto) {
    return this.roleService.updateRoleUsers(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ roleAndPolicy: RolePolicyLevel.Delete })
  async deleteRole(@Param() param: RoleParamDto) {
    return this.roleService.deleteRole(param);
  }
}
