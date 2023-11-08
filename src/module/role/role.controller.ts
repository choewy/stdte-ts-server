import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ListQueryDto, QueryString, RequestUserRole, Role, RolePolicyScopeValue } from '@server/common';
import { UseSignGuard, UseRoleGuard } from '@server/core';

import { CreateRoleBodyDto, GetRoleParamDto, RoleListResponseDto, UpdateRoleBodyDto } from './dto';
import { RoleService } from './role.service';
import { ApiOkResponse } from '@nestjs/swagger';

@UseSignGuard()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseRoleGuard({ accessRole: RolePolicyScopeValue.Read })
  @ApiOkResponse({ type: RoleListResponseDto })
  async getRoleList(@QueryString(ListQueryDto) query: ListQueryDto): Promise<RoleListResponseDto> {
    return this.roleService.getRoleList(query);
  }

  @Post()
  @UseRoleGuard({ accessRole: RolePolicyScopeValue.Write })
  async createRole(@Body() body: CreateRoleBodyDto): Promise<void> {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  @UseRoleGuard({ accessRole: RolePolicyScopeValue.Update })
  async updateRole(
    @RequestUserRole() role: Role,
    @Param() param: GetRoleParamDto,
    @Body() body: UpdateRoleBodyDto,
  ): Promise<void> {
    return this.roleService.updateRole(role, param.id, body);
  }

  @Delete(':id(\\d+)')
  @UseRoleGuard({ accessRole: RolePolicyScopeValue.Delete })
  async deleteRole(@RequestUserRole() role: Role, @Param() param: GetRoleParamDto): Promise<void> {
    return this.roleService.deleteRole(role.id, param.id);
  }
}
