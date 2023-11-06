import { DataSource, DeepPartial, EntityManager, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role, RolePolicy } from '../entities';

export class RoleQuery extends BaseQuery<Role> {
  public static of(source: DataSource | EntityManager) {
    return new RoleQuery(source.getRepository(Role));
  }

  async findRoleByOnInit(): Promise<Role> {
    return this.repository.findOne({
      relations: { rolePolicy: true },
      where: { onInit: true },
    });
  }

  async createRole(role: DeepPartial<Role>): Promise<Role> {
    return this.repository.save(this.repository.create(role));
  }

  async updateRole(
    id: number,
    role: Partial<Omit<Role, 'rolePolicy'> & { rolePolicy?: Partial<RolePolicy> }>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, role);
  }
}
