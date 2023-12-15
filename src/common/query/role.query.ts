import { DataSource, DeepPartial, EntityManager, In, Not } from 'typeorm';

import { Role } from '@entity';

import { EntityQuery } from '../class';
import { FindListArgs, RoleQueryFindListArgs } from './types';

export class RoleQuery extends EntityQuery<Role> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Role);
  }

  async hasRoleById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasRoleByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasRoleByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
  }

  async findRolesByOnInit() {
    return this.repository.find({ where: { onInit: true } });
  }

  async findRoleById(id: number) {
    return this.repository.findOne({
      relations: { policy: true, users: true },
      where: { id },
    });
  }

  async findRoleInIdsWithUsers(ids: number[]) {
    if (ids.length === 0) {
      return [];
    }

    return this.repository.find({
      relations: { users: true },
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          name: true,
        },
      },
      where: { id: In(ids) },
    });
  }

  async findRoleList(args: RoleQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { policy: true, users: true },
      where: { onInit: false },
      skip: args.skip,
      take: args.take,
      order: { createdAt: 'DESC' },
    });
  }

  async findRoleSelectListOrderByName(args: FindListArgs) {
    return this.repository.findAndCount({
      select: { id: true, name: true, onInit: true },
      where: { onInit: false },
      skip: args.skip,
      take: args.take,
      order: { name: 'ASC' },
    });
  }

  async updateRole(id: number, entity: DeepPartial<Role>) {
    await this.repository.update(id, entity);
  }

  async insertRole(name: string) {
    return this.repository.insert(this.repository.create({ name }));
  }

  async upsertRoles(entities: DeepPartial<Role>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }

  async deleteRole(id: number) {
    await this.repository.delete(id);
  }
}
