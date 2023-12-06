import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { SetPolicyLevel } from '@server/common';
import { JwtGuard, RoleGuard } from '@server/core';

import { RoleService } from './role.service';
import { CreateRoleBodyDto, RoleListQueryDto, RoleParamDto, UpdateRoleBodyDto, UpdateRoleUserBodyDto } from './dto';

@SetPolicyLevel({ accessRoleLevel: PolicyLevel.Admin })
@UseGuards(JwtGuard, RoleGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles(@Query() query: RoleListQueryDto) {
    return this.roleService.getRoles(query);
  }

  @Post()
  async createRole(@Body() body: CreateRoleBodyDto) {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  async updateRole(@Param() param: RoleParamDto, @Body() body: UpdateRoleBodyDto) {
    return this.roleService.updateRole(param, body);
  }

  @Put(':id(\\d+)')
  async updateRoleUsers(@Param() param: RoleParamDto, @Body() body: UpdateRoleUserBodyDto) {
    return this.roleService.updateRoleUsers(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteRole(@Param() param: RoleParamDto) {
    return this.roleService.deleteRole(param);
  }
}
