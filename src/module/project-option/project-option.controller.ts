import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { SetPolicyLevel } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { ProjectOptionService } from './project-option.service';
import { CreateProjectOptionBodyDto, ProjectOptionParamDto, UpdateProjectOptionBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('project-options')
export class ProjectOptionController {
  constructor(private readonly projectOptionService: ProjectOptionService) {}

  @Post()
  @SetPolicyLevel({ accessProjectLevel: PolicyLevel.Write })
  async createProjectOption(@Body() body: CreateProjectOptionBodyDto) {
    return this.projectOptionService.createProjectOption(body);
  }

  @Patch(':id(\\d+)')
  @SetPolicyLevel({ accessProjectLevel: PolicyLevel.Update })
  async updateProjectOption(@Param() param: ProjectOptionParamDto, @Body() body: UpdateProjectOptionBodyDto) {
    return this.projectOptionService.updateProjectOption(param, body);
  }

  @Delete(':id(\\d+)')
  @SetPolicyLevel({ accessProjectLevel: PolicyLevel.Delete })
  async deleteProjectOption(@Param() param: ProjectOptionParamDto) {
    return this.projectOptionService.deleteProjectOption(param);
  }
}
