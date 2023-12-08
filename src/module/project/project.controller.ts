import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { SetPolicyLevel } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { ProjectService } from './project.service';
import { CreateProjectBodyDto, ProjectListQueryDto, ProjectParamDto, UpdateProjectBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @SetPolicyLevel({ accessProject: PolicyLevel.Read })
  async getProjects(@Query() query: ProjectListQueryDto) {
    return this.projectService.getProjects(query);
  }

  @Post()
  @SetPolicyLevel({ accessProject: PolicyLevel.Write })
  async createProject(@Body() body: CreateProjectBodyDto) {
    return this.projectService.createProject(body);
  }

  @Patch(':id(\\d+)')
  @SetPolicyLevel({ accessProject: PolicyLevel.Update })
  async updateProject(@Param() param: ProjectParamDto, @Body() body: UpdateProjectBodyDto) {
    return this.projectService.updateProject(param, body);
  }

  @Delete(':id(\\d+)')
  @SetPolicyLevel({ accessProject: PolicyLevel.Delete })
  async deleteProject(@Param() param: ProjectParamDto) {
    return this.projectService.deleteProject(param);
  }
}
