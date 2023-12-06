import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
  @Get()
  async getProjects() {
    return;
  }

  @Post()
  async createProject() {
    return;
  }

  @Patch(':id(\\d+)')
  async updateProject() {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteProject() {
    return;
  }
}
