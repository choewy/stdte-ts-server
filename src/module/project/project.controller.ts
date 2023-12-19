import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { ProjectCreateBodyDto, ProjectListQueryDto, ProjectParamDto, ProjectUpdateBodyDto } from './dto';
import { ProjectService } from './project.service';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async getProjects(@Query() query: ProjectListQueryDto) {
    return this.projectService.getProjects(query);
  }

  @Post()
  @SetRolePolicy({ project: RolePolicyLevel.Create })
  async createProject(@Body() body: ProjectCreateBodyDto) {
    return this.projectService.createProject(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ project: RolePolicyLevel.Update })
  async updateProject(@Param() param: ProjectParamDto, @Body() body: ProjectUpdateBodyDto) {
    return this.projectService.updateProject(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ project: RolePolicyLevel.Delete })
  async deleteProject(@Param() param: ProjectParamDto) {
    return this.projectService.deleteProject(param);
  }
}
