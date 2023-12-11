import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ProjectService } from './project.service';
import {
  ProjectCreateBodyDto,
  ProjectListQueryDto,
  ProjectOrderRecordUpdateBodyDto,
  ProjectParamDto,
  ProjectSaleRecordUpdateBodyDto,
  ProjectUpdateBodyDto,
} from './dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Query() query: ProjectListQueryDto) {
    return this.projectService.getProjects(query);
  }

  @Get(':id(\\d+)')
  async getProject(@Param() param: ProjectParamDto) {
    return this.projectService.getProject(param);
  }

  @Post()
  async createProject(@Body() body: ProjectCreateBodyDto) {
    return this.projectService.createProject(body);
  }

  @Patch(':id(\\d+)')
  async updateProject(@Param() param: ProjectParamDto, @Body() body: ProjectUpdateBodyDto) {
    return this.projectService.updateProject(param, body);
  }

  @Patch(':id(\\d+)/order')
  async updateProjectOrderRecord(@Param() param: ProjectParamDto, @Body() body: ProjectOrderRecordUpdateBodyDto) {
    return this.projectService.updateProjectOrderRecord(param, body);
  }

  @Patch(':id(\\d+)/sale')
  async updateProjectSaleRecord(@Param() param: ProjectParamDto, @Body() body: ProjectSaleRecordUpdateBodyDto) {
    return this.projectService.updateProjectSaleRecord(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteProject(@Param() param: ProjectParamDto) {
    return this.projectService.deleteProject(param);
  }
}
