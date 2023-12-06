import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { Role } from '@entity';

import { EntityQuery } from '../class';

export class RoleQuery extends EntityQuery<Role> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Role);
  }

  async hasRoleById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasRoleByIdAndOnInit(id: number) {
    return this.repository.exist({ where: { id, onInit: true } });
  }

  async hasRoleByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasRoleByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
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

  async updateRoleName(id: number, name?: string) {
    await this.repository.update(id, { name });
  }

  async saveRole(pick: Pick<Role, 'name'>) {
    return this.repository.save(this.repository.create(pick));
  }

  async insertRolesWithBulk(deepPartials: DeepPartial<Role>[]) {
    await this.repository.insert(deepPartials);
  }

  async deleteRole(id: number) {
    await this.repository.delete(id);
  }
}
