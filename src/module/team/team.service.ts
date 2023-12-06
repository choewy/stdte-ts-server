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

    const has = await teamQuery.hasTeamById(param.id);

    if (has === false) {
      throw new NotFoundTeamException();
    }

    if (typeof body.name === 'string') {
      if (await teamQuery.hasTeamByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistTeamException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      const teamQuery = new TeamQuery(em);
      const userQuery = new UserQuery(em);

      const leaderId = await userQuery.findUserIdById(body.leader);
      await teamQuery.updateTeam(param.id, body.name, leaderId);

      if (leaderId == null) {
        return;
      }

      await userQuery.updateUserTeamById(leaderId, param.id);
    });

    return new ResponseDto();
  }

  async updateTeamMembers(param: TeamParamDto, body: UpdateTeamMembersBodyDto) {
    const teamQuery = new TeamQuery(this.dataSource);
    const team = await teamQuery.findTeamLeaderById(param.id);

    if (team == null) {
      throw new NotFoundTeamException();
    }

    await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      await userQuery.deleteUsersTeam(team.id);
      await userQuery.updateUsersTeamInUserIds(team.id, body.members);

      if (team.leader == null) {
        return;
      }

      if (body.members.includes(team.leader.id)) {
        return;
      }

      await new TeamQuery(em).updateTeam(param.id, undefined, null);
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
