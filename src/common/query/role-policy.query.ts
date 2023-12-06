import { DataSource, EntityManager } from 'typeorm';

import { RolePolicy } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async insertRolePolicy(
    pickAndPartial: Pick<RolePolicy, 'role'> &
      Partial<Pick<RolePolicy, 'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'>>,
  ) {
    const rolePolicy = this.repository.create({
      id: pickAndPartial.role.id,
      role: { id: pickAndPartial.role.id },
      accessRoleLevel: pickAndPartial.accessRoleLevel,
      accessTeamLevel: pickAndPartial.accessTeamLevel,
      accessUserLevel: pickAndPartial.accessUserLevel,
      accessProjectLevel: pickAndPartial.accessProjectLevel,
    });

    await this.repository.insert(rolePolicy);

    return rolePolicy;
  }

  async updateRolePolicy(
    roleId: number,
    partial: Partial<
      Pick<RolePolicy, 'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'>
    >,
  ) {
    await this.repository.update(roleId, partial);
  }
}
