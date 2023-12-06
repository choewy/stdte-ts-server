import { DataSource, EntityManager } from 'typeorm';

import { User } from '@entity';

import { EntityQuery } from '../class';

export class UserQuery extends EntityQuery<User> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, User);
  }

  async findUserById(userId: number) {
    return this.repository.findOne({ where: { id: userId } });
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

  saveUser(pick: Pick<User, 'name'>) {
    return this.repository.save(this.repository.create(pick));
  }
}
