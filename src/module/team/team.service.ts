import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ListDto, ResponseDto, TeamQuery } from '@server/common';

import { CreateTeamBodyDto, TeamListQueryDto, TeamParamDto, UpdateTeamBodyDto, UpdateTeamMembersBodyDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private readonly dataSource: DataSource) {}

  async getTeams(query: TeamListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new TeamQuery(this.dataSource).findTeamsAndUserCountAsList(query.take, query.skip)),
    );
  }

  async createTeam(body: CreateTeamBodyDto) {
    return new ResponseDto();
  }

  async updateTeam(param: TeamParamDto, body: UpdateTeamBodyDto) {
    return new ResponseDto();
  }

  async updateTeamMembers(param: TeamParamDto, body: UpdateTeamMembersBodyDto) {
    return new ResponseDto();
  }

  async deleteTeam(param: TeamParamDto) {
    return new ResponseDto();
  }
}
