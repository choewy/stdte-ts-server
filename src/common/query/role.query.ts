import { DataSource, EntityManager } from 'typeorm';

import { Role } from '@entity';

import { EntityQuery } from '../class';

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

  async findRolesAndUserCountAsList(take?: number, skip?: number) {
    return this.repository
      .createQueryBuilder('role')
      .innerJoinAndMapOne('role.policy', 'role.policy', 'policy')
      .leftJoinAndMapMany('role.users', 'role.users', 'users')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async updateRoleName(id: number, name: string) {
    await this.repository.update(id, { name });
  }

  async saveRole(pick: Pick<Role, 'name'>) {
    return this.repository.save(this.repository.create(pick));
  }

  async deleteRole(id: number) {
    await this.repository.delete(id);
  }
}
