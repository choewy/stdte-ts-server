import { DataSource, DeepPartial, EntityManager, FindOptionsRelations, In } from 'typeorm';

import { User } from '@entity';

import { EntityQuery } from '../class';

export class UserQuery extends EntityQuery<User> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, User);
  }

  async hasUserById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findUserList(skip?: number, take?: number) {
    return this.repository.findAndCount({
      relations: { role: true },
      where: { onInit: false },
      skip,
      take,
    });
  }

  async findUsersByOnInit() {
    return this.repository.find({ where: { onInit: true } });
  }

  async findUserById(id: number, relations?: FindOptionsRelations<User>) {
    return this.repository.findOne({ relations, where: { id } });
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

  async insertUsersWithBulk(deepPartials: DeepPartial<User>[]) {
    return this.repository.insert(deepPartials);
  }
}
