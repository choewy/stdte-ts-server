import { Controller, Get, UseGuards } from '@nestjs/common';

import { CredentialsGuard, JwtGuard } from '@server/core';

import { TimeProjectService } from './time-project.service';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('record/project')
export class TimeProjectController {
  constructor(private readonly timeProjectService: TimeProjectService) {}

  @Get()
  async getTimeProjects() {
    return this.timeProjectService.getTimeProjects();
  }
}
