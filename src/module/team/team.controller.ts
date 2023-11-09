import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ListQueryDto } from '@server/common';
import { UseSignGuard } from '@server/core';

import { TeamService } from './team.service';
import { GetTeamParamDto, CreateTeamBodyDto, UpdateTeamBodyDto } from './dto';

@UseSignGuard()
@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'get team list' })
  async getTeamList(@Query() query: ListQueryDto) {
    return;
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: 'get team details' })
  async getTeamById(@Param() param: GetTeamParamDto) {
    return;
  }

  @Get(':id(\\d+)/members')
  @ApiOperation({ summary: 'get team members' })
  async getTeamMembersById(@Param() param: GetTeamParamDto) {
    return;
  }

  @Post()
  @ApiOperation({ summary: 'create team' })
  async createTeam(@Body() body: CreateTeamBodyDto) {
    return;
  }

  @Patch(':id(\\d+)')
  @ApiOperation({ summary: 'update team' })
  async updateTeam(@Param() param: GetTeamParamDto, @Body() body: UpdateTeamBodyDto) {
    return;
  }

  @Delete(':id(\\d+)')
  @ApiOperation({ summary: 'delete team' })
  async deleteTeam(@Param() param: GetTeamParamDto) {
    return;
  }
}
