import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { ProjectOptionService } from './project-option.service';

@Controller('project-options')
export class ProjectOptionController {
  constructor(private readonly projectOptionService: ProjectOptionService) {}

  @Get()
  async getProjetOptions() {
    return;
  }

  @Post()
  async createProjectOption() {
    return;
  }

  @Patch(':id(\\d+)')
  async updateProjectOption() {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteProjectOption() {
    return;
  }
}
