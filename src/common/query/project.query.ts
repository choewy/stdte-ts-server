import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { Project, ProjectPriority } from '@entity';

import { EntityQuery } from '../class';
import { ProjectQueryFindListArgs } from './types';

export class ProjectQuery extends EntityQuery<Project> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Project);
  }

  async hasProjectById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasProjectByCode(code: string) {
    return this.repository.exist({ where: { code } });
  }

  async hasProjectByCodeOmitId(id: number, code: string) {
    return this.repository.exist({ where: { id: Not(id), code } });
  }

  async findProjectById(id: number) {
    return this.repository.findOne({
      relations: {
        businessCategory: true,
        industryCategory: true,
        taskMainCategory: true,
        customer: true,
        internalOwners: { user: true },
        internalManagers: { user: true },
        internalLeaders: { user: true },
        externalOwners: { user: true },
        externalManagers: { user: true },
        externalLeaders: { user: true },
      },
      where: { id },
    });
  }

  async findAll() {
    return this.repository.find({
      relations: {
        businessCategory: true,
        industryCategory: true,
        taskMainCategory: true,
        customer: true,
        internalOwners: { user: true },
        internalManagers: { user: true },
        internalLeaders: { user: true },
        externalOwners: { user: true },
        externalManagers: { user: true },
        externalLeaders: { user: true },
      },
      where: { priority: ProjectPriority.Business },
    });
  }

  async findProjectList(args: ProjectQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: {
        businessCategory: true,
        industryCategory: true,
        taskMainCategory: true,
        customer: true,
        internalOwners: { user: true },
        internalManagers: { user: true },
        internalLeaders: { user: true },
        externalOwners: { user: true },
        externalManagers: { user: true },
        externalLeaders: { user: true },
      },
      skip: args.skip,
      take: args.take,
      where: { priority: ProjectPriority.Business },
      order: { createdAt: 'DESC' },
    });
  }

  async findProjectListByCanExpose() {
    return this.repository.findAndCount({
      relations: { taskMainCategory: { children: true } },
      select: {
        id: true,
        name: true,
        code: true,
        canExpose: true,
        priority: true,
        taskMainCategory: {
          id: true,
          name: true,
          children: { id: true, name: true },
        },
      },
      where: { canExpose: true },
      order: { priority: 'ASC', id: 'ASC' },
    });
  }

  async insertProject(entity: DeepPartial<Project>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async updateProject(id: number, entity: DeepPartial<Project>) {
    return this.repository.update({ id }, entity);
  }

  async deleteProject(id: number) {
    return this.repository.softDelete({ id });
  }
}
