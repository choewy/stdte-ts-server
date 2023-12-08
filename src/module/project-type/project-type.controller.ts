import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';
import { SetPolicyLevel } from '@server/common';

import { ProjectTypeService } from './project-type.service';
import {
  CreateProjectTypeBodyDto,
  ProjectTypeListQueryDto,
  ProjectTypeParamDto,
  UpdateProjectTypeBodyDto,
} from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('project-types')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @Get()
  @SetPolicyLevel({ accessProject: PolicyLevel.Read })
  async getProjectTypes(@Query() query: ProjectTypeListQueryDto) {
    return this.projectTypeService.getProjectTypes(query);
  }

  @Post()
  @SetPolicyLevel({ accessProject: PolicyLevel.Write })
  async createProjectType(@Body() body: CreateProjectTypeBodyDto) {
    return this.projectTypeService.createProjectType(body);
  }

  @Patch(':id(\\d+)')
  @SetPolicyLevel({ accessProject: PolicyLevel.Update })
  async updateProjectType(@Param() param: ProjectTypeParamDto, @Body() body: UpdateProjectTypeBodyDto) {
    return this.projectTypeService.updateProjectType(param, body);
  }

  @Delete(':id(\\d+)')
  @SetPolicyLevel({ accessProject: PolicyLevel.Delete })
  async deleteProjectType(@Param() param: ProjectTypeParamDto) {
    return this.projectTypeService.deleteProjectType(param);
  }
}
