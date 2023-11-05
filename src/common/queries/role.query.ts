import { DataSource, DeepPartial, EntityManager, Repository, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role, RolePolicy } from '../entities';

export class RoleQuery extends BaseQuery<Role> {
  public static withRepository(repository: Repository<Role>) {
    return new RoleQuery(repository);
  }

  public static withDataSource(dataSource: DataSource | EntityManager) {
    return new RoleQuery(dataSource.getRepository(Role));
  }

  async findRoleByInit(): Promise<Role> {
    return this.repository.findOne({
      relations: { rolePolicy: true },
      where: { init: true },
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
