import { DataSource, EntityManager, In, Not } from 'typeorm';

import { Team, User } from '@entity';

import { EntityQuery } from '../class';

export class TeamQuery extends EntityQuery<Team> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Team);
  }

  async hasTeamById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasTeamByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasTeamByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
  }

  async findTeamsAndUserCountAsList(skip?: number, take?: number) {
    return this.repository
      .createQueryBuilder('team')
      .leftJoinAndMapOne('team.leader', 'team.leader', 'leader')
      .leftJoinAndMapMany('team.members', 'team.members', 'members')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async findTeamIdsByids(ids: number[]) {
    if (ids.length === 0) {
      return [];
    }

    const teams = await this.repository.find({
      select: { id: true },
      where: { id: In(ids) },
    });

    return teams.map(({ id }) => id);
  }

  async findTeamLeaderById(id: number) {
    return this.repository.findOne({
      relations: { leader: true },
      select: { id: true, leader: { id: true } },
      where: { id },
    });
  }

  async updateTeam(id: number, name?: string, leaderId?: number | null) {
    let leader: Pick<User, 'id'> | undefined | null;

    if (leaderId === undefined) {
      leader = undefined;
    } else if (leaderId === null) {
      leader = null;
    } else {
      leader = { id: leaderId };
    }

    await this.repository.update(id, { name, leader });
  }

  async saveTeam(name: string, leaderId?: number | null) {
    let leader: Pick<User, 'id'> | undefined | null;

    if (leaderId === undefined) {
      leader = undefined;
    } else if (leaderId === null) {
      leader = null;
    } else {
      leader = { id: leaderId };
    }

    return this.repository.save(this.repository.create({ name, leader }));
  }

  async deleteTeam(id: number) {
    await this.repository.delete(id);
  }
}
