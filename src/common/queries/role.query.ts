import { DataSource, DeepPartial, DeleteResult, EntityManager, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role, RolePolicy } from '../entities';

export class RoleQuery extends BaseQuery<Role> {
  public static of(source: DataSource | EntityManager) {
    return new RoleQuery(source.getRepository(Role));
  }

  async hasRoleByName(name: string): Promise<boolean> {
    return this.repository.exist({
      select: { id: true, name: true, onInit: true },
      where: { name },
    });
  }

  async findRoleByOnInit(): Promise<Role> {
    return this.repository.findOne({
      relations: { rolePolicy: true },
      where: { onInit: true },
    });
  }

  async findRolesAndCount(skip: number, take: number): Promise<[Role[], number]> {
    return this.repository.findAndCount({
      relations: {
        rolePolicy: true,
        users: { team: true },
      },
      where: { onInit: false },
      skip,
      take,
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

  async deleteRole(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
