import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { ProjectTypeService } from './project-type.service';

@Controller('project-types')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @Get()
  async getProjectTypes() {
    return;
  }

  @Post()
  async createProjectType() {
    return;
  }

  @Patch(':id(\\d+)')
  async updateProjectType() {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteProjectType() {
    return;
  }
}
