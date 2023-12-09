import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { RolePolicy, RolePolicyProperty } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async hasRolePolicyById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async insertRolePolicy(pickAndPartial: Pick<RolePolicy, 'role'> & Partial<RolePolicyProperty>) {
    const rolePolicy = this.repository.create({
      id: pickAndPartial.role.id,
      role: { id: pickAndPartial.role.id },
      credentials: pickAndPartial.credentials,
      roleAndPolicy: pickAndPartial.roleAndPolicy,
      user: pickAndPartial.user,
      project: pickAndPartial.project,
    });

    await this.repository.insert(rolePolicy);

    return rolePolicy;
  }

  async insertRolePoliciesWithBulk(deepPartials: DeepPartial<RolePolicy>[]) {
    await this.repository.insert(deepPartials);
  }

  async updateRolePolicy(roleId: number, partial: Partial<RolePolicyProperty>) {
    await this.repository.update(roleId, partial);
  }
}
