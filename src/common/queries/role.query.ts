import { DataSource, DeepPartial, DeleteResult, EntityManager, UpdateResult } from 'typeorm';

import { BaseQuery } from '../constants';
import { Role } from '../entities';

export class RoleQuery extends BaseQuery<Role> {
  public static of(source: DataSource | EntityManager) {
    return new RoleQuery(source.getRepository(Role));
  }

  async hasRoleById(id: number): Promise<boolean> {
    return this.repository.exist({
      select: { id: true, onInit: true },
      where: { id, onInit: false },
    });
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

  async saveRole(role: DeepPartial<Role>): Promise<Role> {
    if (role.id === undefined || role instanceof Role === false) {
      role = this.repository.create(role);
    }

    return this.repository.save(role);
  }

  async updateRole(id: number, role: DeepPartial<Role>): Promise<UpdateResult> {
    return this.repository.update(id, role);
  }

  async deleteRole(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
