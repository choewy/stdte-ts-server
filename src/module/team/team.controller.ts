import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ListQueryDto } from '@server/common';

import { TeamService } from './team.service';
import { GetTeamParamDto, CreateTeamBodyDto, UpdateTeamBodyDto } from './dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getTeamList(@Query() query: ListQueryDto) {
    return;
  }

  @Get(':id(\\d+)')
  async getTeamById(@Param() param: GetTeamParamDto) {
    return;
  }

  @Get(':id(\\d+)/members')
  async getTeamMembersById(@Param() param: GetTeamParamDto) {
    return;
  }

  @Post()
  async createTeam(@Body() body: CreateTeamBodyDto) {
    return;
  }

  @Patch(':id(\\d+)')
  async updateTeam(@Param() param: GetTeamParamDto, @Body() body: UpdateTeamBodyDto) {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteTeam(@Param() param: GetTeamParamDto) {
    return;
  }
}
