import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { Role, RolePolicy, RolePolicyProperty } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async findRolePoliciesByOnInit() {
    return this.repository.find({ where: { onInit: true } });
  }

  async insertRolePolicy(roleId: number, entity: DeepPartial<RolePolicy>) {
    await this.repository.insert(this.repository.create({ id: roleId, role: { id: roleId }, ...entity }));
  }

  async upsertRolePolicies(entities: DeepPartial<RolePolicy>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }

  async updateRolePolicy(roleId: number, entity: DeepPartial<RolePolicyProperty>) {
    await this.repository.update(roleId, entity);
  }
}
