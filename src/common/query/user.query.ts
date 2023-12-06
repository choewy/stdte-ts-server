import { DataSource, DeepPartial, EntityManager, In } from 'typeorm';

import { User } from '@entity';

import { EntityQuery } from '../class';

export class UserQuery extends EntityQuery<User> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, User);
  }

  async hasUserByIdAndOnInit(id: number) {
    return this.repository.exist({ where: { id, onInit: true } });
  }

  async findUsersAsList(take?: number, skip?: number) {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.role', 'user.role', 'role')
      .leftJoinAndMapOne('user.team', 'user.team', 'team')
      .leftJoinAndMapMany('user.teamsByLeader', 'user.teamsByLeader', 'teamsByLeader')
      .where('user.onInit = false')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async findUserById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async findUserIdById(id?: number) {
    if (id === undefined) {
      return undefined;
    }

    if (id === null) {
      return null;
    }

    const user = await this.repository.findOne({
      select: { id: true },
      where: { id, onInit: false },
    });

    if (user == null) {
      return undefined;
    }

    return user.id;
  }

  async findUserWithRoleById(id: number) {
    return this.repository.findOne({
      relations: { role: { policy: true } },
      where: { id },
    });
  }

  async updateUserProfile(
    id: number,
    partial: Partial<
      Pick<
        User,
        | 'name'
        | 'phone'
        | 'birthday'
        | 'genderCode'
        | 'scienceCode'
        | 'degree'
        | 'school'
        | 'major'
        | 'carType'
        | 'carNumber'
      >
    >,
  ) {
    await this.repository.update(id, partial);
  }

  async updateUsersRoleInUserIds(roleId: number, ids: number[]) {
    if (ids.length === 0) {
      return;
    }

    await this.repository.update({ id: In(ids), onInit: false }, { role: { id: roleId } });
  }

  async deleteUsersRole(roleId: number) {
    await this.repository.update({ role: { id: roleId }, onInit: false }, { role: null });
  }

  async updateUserTeamById(id: number, teamId: number) {
    await this.repository.update({ id, onInit: false }, { team: { id: teamId } });
  }

  async updateUsersTeamInUserIds(teamId: number, ids: number[]) {
    if (ids.length === 0) {
      return;
    }

    await this.repository.update({ id: In(ids), onInit: false }, { team: { id: teamId } });
  }

  async deleteUsersTeam(teamId: number) {
    await this.repository.update({ team: { id: teamId }, onInit: false }, { team: null });
  }

  saveUser(pick: Pick<User, 'name'>) {
    return this.repository.save(this.repository.create(pick));
  }

  insertUsersWithBulk(deepPartials: DeepPartial<User>[]) {
    return this.repository.insert(deepPartials);
  }
}
