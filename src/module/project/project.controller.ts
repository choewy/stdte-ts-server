import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { ProjectService } from './project.service';
import {
  ProjectCreateBodyDto,
  ProjectListQueryDto,
  ProjectParamDto,
  ProjectRecordCreateBodyDto,
  ProjectRecordListQueryDto,
  ProjectRecordParamDto,
  ProjectUpdateBodyDto,
} from './dto';

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

  @Post('download')
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async downloadProjects() {
    return this.projectService.downloadProjects();
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

  @Get(':id(\\d+)/records')
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async getProjectRecords(@Param() param: ProjectParamDto, @Query() query: ProjectRecordListQueryDto) {
    return this.projectService.getProjectRecords(param, query);
  }

  @Post('records')
  @SetRolePolicy({ project: RolePolicyLevel.Update })
  async createProjectRecord(@Body() body: ProjectRecordCreateBodyDto) {
    return this.projectService.createProjectRecord(body);
  }

  @Patch('records/:id(\\d+)/:type')
  @SetRolePolicy({ project: RolePolicyLevel.Update })
  async updateProjectRecord(@Param() param: ProjectRecordParamDto, @Body() body: ProjectRecordCreateBodyDto) {
    return this.projectService.updateProjectRecord(param, body);
  }

  @Delete('records/:id(\\d+)/:type')
  @SetRolePolicy({ project: RolePolicyLevel.Update })
  async deleteProjectRecord(@Param() param: ProjectRecordParamDto) {
    return this.projectService.deleteProjectRecord(param);
  }
}
