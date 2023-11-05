import { DataSource, DeepPartial, Repository, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role, RolePolicy, User } from '../entities';

export class UserQuery extends BaseQuery<User> {
  public static withRepository(repository: Repository<User>) {
    return new UserQuery(repository);
  }

  public static withDataSource(dataSource: DataSource) {
    return new UserQuery(dataSource.getRepository(User));
  }

  async findUserByOnInit(): Promise<User> {
    return this.repository.findOne({
      where: { onInit: true },
    });
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
      relations: {
        role: { rolePolicy: true },
        team: true,
      },
      where: { email },
    });
  }

  async findUserByUserId(id: number): Promise<User> {
    return this.repository.findOne({
      relations: {
        role: { rolePolicy: true },
        team: true,
      },
      where: { id },
    });
  }

  async findUserPasswordByUserId(id: number): Promise<User> {
    return this.repository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
      },
      where: { id },
    });
  }

  async findUserRoleByUserId(id: number) {
    return this.repository.findOne({
      relations: { role: { rolePolicy: true } },
      where: { id },
    }) as Promise<User & { role?: Role & { rolePolicy?: RolePolicy } }>;
  }

  async createUser(user: DeepPartial<User>): Promise<User> {
    if (user instanceof User === false) {
      user = this.repository.create(user);
    }

    return this.repository.save(user);
  }

  async updateUser(id: number, user: DeepPartial<User>): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }
}
