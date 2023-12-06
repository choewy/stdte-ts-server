import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { SetPolicyLevel } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { RoleService } from './role.service';
import { CreateRoleBodyDto, RoleListQueryDto, RoleParamDto, UpdateRoleBodyDto, UpdateRoleUsersBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @SetPolicyLevel({ accessRoleLevel: PolicyLevel.Read })
  async getRoles(@Query() query: RoleListQueryDto) {
    return this.roleService.getRoles(query);
  }

  @Post()
  @SetPolicyLevel({ accessRoleLevel: PolicyLevel.Write })
  async createRole(@Body() body: CreateRoleBodyDto) {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  @SetPolicyLevel({ accessRoleLevel: PolicyLevel.Update })
  async updateRole(@Param() param: RoleParamDto, @Body() body: UpdateRoleBodyDto) {
    return this.roleService.updateRole(param, body);
  }

  @Put(':id(\\d+)')
  @SetPolicyLevel({ accessRoleLevel: PolicyLevel.Update })
  async updateRoleUsers(@Param() param: RoleParamDto, @Body() body: UpdateRoleUsersBodyDto) {
    return this.roleService.updateRoleUsers(param, body);
  }

  @Delete(':id(\\d+)')
  @SetPolicyLevel({ accessRoleLevel: PolicyLevel.Delete })
  async deleteRole(@Param() param: RoleParamDto) {
    return this.roleService.deleteRole(param);
  }
}
