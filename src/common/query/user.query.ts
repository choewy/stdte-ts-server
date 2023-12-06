import { DataSource, EntityManager } from 'typeorm';

import { User } from '@entity';

import { EntityQuery } from '../class';

export class UserQuery extends EntityQuery<User> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, User);
  }

  saveUser(deepPartial: Pick<User, 'name'>) {
    return this.repository.save(this.repository.create(deepPartial));
  }
}
