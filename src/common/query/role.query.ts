import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { Role } from '@entity';

import { EntityQuery } from '../class';
import { RoleQueryFindListArgs } from './types';

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

  async findRoleList(args: RoleQueryFindListArgs) {
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
