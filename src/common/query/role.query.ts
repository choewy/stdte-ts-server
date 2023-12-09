import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { Role } from '@entity';

import { EntityQuery } from '../class';
import { RoleQueryGetListArgs } from './types';

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

  async findRoleList(args: RoleQueryGetListArgs) {
    return this.repository
      .createQueryBuilder('role')
      .innerJoinAndMapOne('role.policy', 'role.policy', 'policy')
      .leftJoinAndMapMany('role.users', 'role.users', 'users')
      .where('role.onInit = false')
      .skip(args.skip)
      .take(args.take)
      .getManyAndCount();
  }

  async updateRole(id: number, entity: DeepPartial<Role>) {
    await this.repository.update(id, entity);
  }

  async createRole(name: string) {
    return this.repository.save(this.repository.create({ name }));
  }

  async upsertRoles(entities: DeepPartial<Role>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }

  async deleteRole(id: number) {
    await this.repository.delete(id);
  }
}
