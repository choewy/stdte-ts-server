import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  AlreadyExistTeamException,
  ListDto,
  NotFoundTeamException,
  ResponseDto,
  TeamQuery,
  UserQuery,
} from '@server/common';

import { CreateTeamBodyDto, TeamListQueryDto, TeamParamDto, UpdateTeamBodyDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private readonly dataSource: DataSource) {}

  async getTeams(query: TeamListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new TeamQuery(this.dataSource).findTeamsAndUserCountAsList(query.skip, query.take)),
    );
  }

  async createTeam(body: CreateTeamBodyDto) {
    const has = await new TeamQuery(this.dataSource).hasTeamByName(body.name);

    if (has) {
      throw new AlreadyExistTeamException();
    }

    await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      const teamQuery = new TeamQuery(em);

      const team = await teamQuery.saveTeam(body.name, await userQuery.findUserIdById(body.leader));

      if (team.leader == null) {
        return;
      }

      await userQuery.updateUserTeamById(team.leader.id, team.id);
    });

    return new ResponseDto();
  }

  async updateTeam(param: TeamParamDto, body: UpdateTeamBodyDto) {
    const teamQuery = new TeamQuery(this.dataSource);
    const team = await teamQuery.findTeamLeaderById(param.id);

    if (team === null) {
      throw new NotFoundTeamException();
    }

    if (typeof body.name === 'string') {
      if (await teamQuery.hasTeamByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistTeamException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      const teamQuery = new TeamQuery(em);

      if (Array.isArray(body.members)) {
        await userQuery.deleteUsersTeam(param.id);
        await userQuery.updateUsersTeamInUserIds(param.id, body.members);
      }

      const leaderId = await userQuery.findUserIdById(body.leader);

      if (leaderId) {
        await userQuery.updateUserTeamById(leaderId, param.id);
      }

      await teamQuery.updateTeam(param.id, body.name, leaderId);
    });

    return new ResponseDto();
  }

  async deleteTeam(param: TeamParamDto) {
    const teamQuery = new TeamQuery(this.dataSource);

    const has = await teamQuery.hasTeamById(param.id);

    if (has === false) {
      throw new NotFoundTeamException();
    }

    await teamQuery.deleteTeam(param.id);

    return new ResponseDto();
  }
}
