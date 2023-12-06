import { DataSource, EntityManager } from 'typeorm';

import { Team } from '@entity';

import { EntityQuery } from '../class';

export class TeamQuery extends EntityQuery<Team> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Team);
  }

  async findTeamsAndUserCountAsList(take?: number, skip?: number) {
    return this.repository
      .createQueryBuilder('team')
      .leftJoinAndMapOne('team.leader', 'team.leader', 'leader')
      .leftJoinAndMapMany('team.members', 'team.members', 'members')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
