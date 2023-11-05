import { DataSource, DeepPartial, Repository } from 'typeorm';

import { Type } from '@nestjs/common';

import { BaseQuery } from '../constants';
import { User } from '../entities';

export class UserQuery extends BaseQuery<User> {
  public static withRepository(repository: Repository<User>) {
    return new UserQuery(repository);
  }

  public static withDataSource(Entity: Type<User>, dataSource: DataSource) {
    return new UserQuery(dataSource.getRepository(Entity));
  }

  async hasUserByEmail(email: string): Promise<boolean> {
    return this.repository.exist({
      select: {
        id: true,
        email: true,
      },
      where: { email },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
      where: { email },
    });
  }

  async createUser(user: DeepPartial<User>): Promise<User> {
    user = await this.repository.save(user);

    return user as User;
  }
}
