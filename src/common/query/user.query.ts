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

  async findUserById(userId: number) {
    return this.repository.findOne({ where: { id: userId } });
  }

  async findUserWithRoleById(id: number) {
    return this.repository.findOne({
      relations: { role: { policy: true } },
      where: { id },
    });
  }

  async updateUserProfile(
    userId: number,
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
    await this.repository.update(userId, partial);
  }

  async updateUsersRoleInUserIds(roleId: number, userIds: number[]) {
    if (userIds.length === 0) {
      return;
    }

    await this.repository.update({ id: In(userIds) }, { role: { id: roleId } });
  }

  async deleteUsersRole(roleId: number) {
    await this.repository.update({ role: { id: roleId } }, { role: null });
  }

  saveUser(pick: Pick<User, 'name'>) {
    return this.repository.save(this.repository.create(pick));
  }

  insertUsersWithBulk(deepPartials: DeepPartial<User>[]) {
    return this.repository.insert(deepPartials);
  }
}
