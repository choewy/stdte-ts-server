import { DataSource, DeepPartial, EntityManager, FindOptionsRelations, In, IsNull, Not } from 'typeorm';

import { CredentialsStatus, User } from '@entity';

import { EntityQuery } from '../class';
import { FindListArgs, UserQueryFindListArgs } from './types';

export class UserQuery extends EntityQuery<User> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, User);
  }

  async hasUserById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findUserList(args: UserQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { credentials: true, role: { policy: true } },
      where: { onInit: false, credentials: { status: CredentialsStatus.Active } },
      skip: args.skip,
      take: args.take,
      order: { name: 'ASC' },
    });
  }

  async findUserSelectListOrderByName(args: FindListArgs) {
    return this.repository.findAndCount({
      relations: { role: true },
      select: { id: true, name: true, onInit: true },
      where: { onInit: false, credentials: { status: Not(CredentialsStatus.Wating) } },
      skip: args.skip,
      take: args.take,
      order: { name: 'ASC' },
    });
  }

  async findUsersByOnInit() {
    return this.repository.find({ where: { onInit: true } });
  }

  async findUserById(id: number, relations?: FindOptionsRelations<User>) {
    return this.repository.findOne({ relations, where: { id } });
  }

  async findUsersInIdsByHasRole(ids: number[]) {
    if (ids.length === 0) {
      return [];
    }

    return this.repository.find({
      relations: { role: true },
      where: {
        id: In(ids),
        role: { id: Not(IsNull()) },
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.repository.findOne({
      relations: { credentials: true, role: { policy: true } },
      where: { credentials: { email } },
    });
  }

  async updateUser(id: number, entity: DeepPartial<User>) {
    await this.repository.update(id, entity);
  }

  async updateUsers(ids: number[], entity: DeepPartial<User>) {
    await this.repository.update({ id: In(ids) }, entity);
  }

  async createUser(entity: DeepPartial<User>) {
    return this.repository.save(this.repository.create(entity));
  }

  async upsertUsers(entities: DeepPartial<User>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }

  async deleteUsersRole(roleId: number) {
    await this.repository.update({ role: { id: roleId } }, { role: null });
  }
}
