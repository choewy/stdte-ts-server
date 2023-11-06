import { DataSource, DeepPartial, EntityManager, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { RolePolicy } from '../entities';

export class RolePolicyQuery extends BaseQuery<RolePolicy> {
  public static of(source: DataSource | EntityManager) {
    return new RolePolicyQuery(source.getRepository(RolePolicy));
  }

  async updateRolePolicy(id: number, rolePolicy: DeepPartial<RolePolicy>): Promise<UpdateResult> {
    return this.repository.update(id, rolePolicy);
  }
}
