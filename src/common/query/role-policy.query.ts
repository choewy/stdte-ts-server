import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { RolePolicy, RolePolicyProperty } from '@entity';

import { EntityQuery } from '../class';

export class RolePolicyQuery extends EntityQuery<RolePolicy> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, RolePolicy);
  }

  async findRolePoliciesByOnInit() {
    return this.repository.find({ where: { onInit: true } });
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

  async upsertRolePolicies(entities: DeepPartial<RolePolicy>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }

  async updateRolePolicy(roleId: number, partial: Partial<RolePolicyProperty>) {
    await this.repository.update(roleId, partial);
  }
}
