import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';
import { SetPolicyLevel } from '@server/common';

import { TeamService } from './team.service';
import { CreateTeamBodyDto, TeamListQueryDto, TeamParamDto, UpdateTeamBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @SetPolicyLevel({ accessTeamLevel: PolicyLevel.Read })
  async getTeams(@Query() query: TeamListQueryDto) {
    return this.teamService.getTeams(query);
  }

  @Post()
  @SetPolicyLevel({ accessTeamLevel: PolicyLevel.Write })
  async createTeam(@Body() body: CreateTeamBodyDto) {
    return this.teamService.createTeam(body);
  }

  @Patch(':id(\\d+)')
  @SetPolicyLevel({ accessTeamLevel: PolicyLevel.Update })
  async updateTeam(@Param() param: TeamParamDto, @Body() body: UpdateTeamBodyDto) {
    return this.teamService.updateTeam(param, body);
  }

  @Delete(':id(\\d+)')
  @SetPolicyLevel({ accessTeamLevel: PolicyLevel.Delete })
  async deleteTeam(@Param() param: TeamParamDto) {
    return this.teamService.deleteTeam(param);
  }
}
