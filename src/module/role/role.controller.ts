import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestUser, RolePolicyScope, User } from '@server/common';
import { UseSignGuard, UseRoleGuard } from '@server/core';
import { ExceptionResponseDto, ListQueryDto } from '@server/dto';

import { CreateRoleBodyDto, GetRoleParamDto, RoleListResponseDto, UpdateRoleBodyDto } from './dto';
import { RoleService } from './role.service';

@UseSignGuard()
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseRoleGuard({ accessRole: RolePolicyScope.Read })
  @ApiOperation({ summary: 'get role list' })
  @ApiOkResponse({ type: RoleListResponseDto })
  async getRoleList(@Query() query: ListQueryDto): Promise<RoleListResponseDto> {
    return this.roleService.getRoleList(query);
  }

  @Post()
  @UseRoleGuard({ accessRole: RolePolicyScope.Write })
  @ApiOperation({ summary: 'create role' })
  @ApiConflictResponse({ type: ExceptionResponseDto })
  async createRole(@Body() body: CreateRoleBodyDto): Promise<void> {
    return this.roleService.createRole(body);
  }

  @Patch(':id(\\d+)')
  @UseRoleGuard({ accessRole: RolePolicyScope.Update })
  @ApiOperation({ summary: 'update role' })
  @ApiConflictResponse({ type: ExceptionResponseDto })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async updateRole(
    @RequestUser() user: User,
    @Param() param: GetRoleParamDto,
    @Body() body: UpdateRoleBodyDto,
  ): Promise<void> {
    return this.roleService.updateRole(user, param.id, body);
  }

  @Delete(':id(\\d+)')
  @UseRoleGuard({ accessRole: RolePolicyScope.Delete })
  @ApiOperation({ summary: 'delete role' })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async deleteRole(@RequestUser() user: User, @Param() param: GetRoleParamDto): Promise<void> {
    return this.roleService.deleteRole(user, param.id);
  }
}
