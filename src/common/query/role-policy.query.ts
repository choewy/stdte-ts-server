import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { RolePolicy, RolePolicyProperty } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async insertRolePolicy(roleId: number, entity: DeepPartial<RolePolicy>) {
    await this.repository.insert(this.repository.create({ id: roleId, role: { id: roleId }, ...entity }));
  }

  async updateRolePolicy(roleId: number, entity: DeepPartial<RolePolicyProperty>) {
    await this.repository.update(roleId, entity);
  }
}
