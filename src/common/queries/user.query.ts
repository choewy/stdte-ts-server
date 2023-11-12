import { DataSource, DeepPartial, EntityManager, In, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role, RolePolicy, User } from '../entities';

export class UserQuery extends BaseQuery<User> {
  public static of(source: DataSource | EntityManager) {
    return new UserQuery(source.getRepository(User));
  }

  async findUserInGuard(id: number): Promise<User> {
    return this.repository.findOne({
      relations: {
        role: { rolePolicy: true },
        team: true,
      },
      where: { id },
    });
  }

  async findUserByOnInit(): Promise<User> {
    return this.repository.findOne({
      where: { onInit: true },
    });
  }

  async findUserIdInIds(ids: number[]): Promise<User[]> {
    return this.repository.find({
      select: { id: true },
      where: {
        id: In(ids),
        onInit: false,
      },
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

  async saveUser(user: DeepPartial<User>): Promise<User> {
    return this.repository.save(this.repository.create(user));
  }

  async saveUsers(users: DeepPartial<User>[]): Promise<User[]> {
    return this.repository.save(this.repository.create(users));
  }

  async updateUser(id: number | number[], user: DeepPartial<User>): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }
}
