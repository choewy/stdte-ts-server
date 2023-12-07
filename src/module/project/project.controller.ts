import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ProjectService } from './project.service';
import { CreateProjectBodyDto, ProjectListQueryDto, ProjectParamDto, UpdateProjectBodyDto } from './dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Query() query: ProjectListQueryDto) {
    return this.projectService.getProjects(query);
  }

  @Post()
  async createProject(@Body() body: CreateProjectBodyDto) {
    return this.projectService.createProject(body);
  }

  @Patch(':id(\\d+)')
  async updateProject(@Param() param: ProjectParamDto, @Body() body: UpdateProjectBodyDto) {
    return this.projectService.updateProject(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteProject(@Param() param: ProjectParamDto) {
    return this.projectService.deleteProject(param);
  }
}
