import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { RolePolicy } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async hasRolePolicyById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async insertRolePolicy(
    pickAndPartial: Pick<RolePolicy, 'role'> &
      Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRole' | 'accessUser' | 'accessProject'>>,
  ) {
    const rolePolicy = this.repository.create({
      id: pickAndPartial.role.id,
      role: { id: pickAndPartial.role.id },
      accessCredentials: pickAndPartial.accessCredentials,
      accessRole: pickAndPartial.accessRole,
      accessUser: pickAndPartial.accessUser,
      accessProject: pickAndPartial.accessProject,
    });

    await this.repository.insert(rolePolicy);

    return rolePolicy;
  }

  async insertRolePoliciesWithBulk(deepPartials: DeepPartial<RolePolicy>[]) {
    await this.repository.insert(deepPartials);
  }

  async updateRolePolicy(
    roleId: number,
    partial: Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRole' | 'accessUser' | 'accessProject'>>,
  ) {
    await this.repository.update(roleId, partial);
  }
}
