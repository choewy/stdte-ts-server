import { Controller, Get, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { TimeProjectService } from './time-project.service';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('record/project')
export class TimeProjectController {
  constructor(private readonly timeProjectService: TimeProjectService) {}

  @Get()
  async getTimeProjects() {
    return this.timeProjectService.getTimeProjects();
  }
}
