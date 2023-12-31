import { DataSource, DeepPartial, EntityManager } from 'typeorm';

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

  async findProjectById(id: number) {
    return this.repository.findOne({
      relations: {
        businessCategory: true,
        industryCategory: true,
        taskMainCategory: true,
        customer: true,
        externalManagers: { user: true },
        internalManagers: { user: true },
        internalLeaders: { user: true },
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
        externalManagers: { user: true },
        internalManagers: { user: true },
        internalLeaders: { user: true },
      },
      order: { priority: 'ASC' },
    });
  }

  async findAllByActive() {
    return this.repository.find({
      where: { canExpose: true },
      order: { priority: 'ASC' },
    });
  }

  async findProjectList(args: ProjectQueryFindListArgs) {
    const queryBuilder = this.repository
      .createQueryBuilder('project')
      .leftJoinAndMapOne('project.businessCategory', 'project.businessCategory', 'businessCategory')
      .leftJoinAndMapOne('project.industryCategory', 'project.industryCategory', 'industryCategory')
      .leftJoinAndMapOne('project.taskMainCategory', 'project.taskMainCategory', 'taskMainCategory')
      .leftJoinAndMapOne('project.customer', 'project.customer', 'customer')
      .leftJoinAndMapMany('project.externalManagers', 'project.externalManagers', 'externalManagers')
      .leftJoinAndMapMany('project.internalManagers', 'project.internalManagers', 'internalManagers')
      .leftJoinAndMapMany('project.internalLeaders', 'project.internalLeaders', 'internalLeaders')
      .leftJoinAndMapOne('externalManagers.user', 'externalManagers.user', 'externalManager')
      .leftJoinAndMapOne('internalManagers.user', 'internalManagers.user', 'internalManager')
      .leftJoinAndMapOne('internalLeaders.user', 'internalLeaders.user', 'internalLeader')
      .where({ priority: ProjectPriority.Business });

    if (typeof args.businessCategory === 'number') {
      queryBuilder.andWhere('businessCategory.id = :businessCategory', {
        businessCategory: args.businessCategory,
      });
    }

    if (typeof args.industryCategory === 'number') {
      queryBuilder.andWhere('industryCategory.id = :industryCategory', {
        industryCategory: args.industryCategory,
      });
    }

    if (typeof args.canExpose === 'boolean') {
      queryBuilder.andWhere('project.canExpose = :canExpose', {
        canExpose: args.canExpose,
      });
    }

    if (typeof args.customer === 'number') {
      queryBuilder.andWhere('project.customer = :customer', {
        customer: args.customer,
      });
    }

    if (typeof args.status === 'number') {
      queryBuilder.andWhere('project.status = :status', {
        status: args.status,
      });
    }

    return Promise.all([
      queryBuilder.clone().skip(args.skip).take(args.take).orderBy('project.id', 'ASC').getManyAndCount(),
      queryBuilder.clone().select('SUM(project.amount)', 'amounts').getRawOne<{ amounts: string }>(),
    ]);
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
