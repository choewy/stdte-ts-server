import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { Project, ProjectPriority, ProjectStatus } from '@entity';

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
      .leftJoinAndMapMany('project.internalOwners', 'project.internalOwners', 'internalOwners')
      .leftJoinAndMapMany('project.internalManagers', 'project.internalManagers', 'internalManagers')
      .leftJoinAndMapMany('project.internalLeaders', 'project.internalLeaders', 'internalLeaders')
      .leftJoinAndMapMany('project.externalOwners', 'project.externalOwners', 'externalOwners')
      .leftJoinAndMapMany('project.externalManagers', 'project.externalManagers', 'externalManagers')
      .leftJoinAndMapMany('project.externalLeaders', 'project.externalLeaders', 'externalLeaders')
      .leftJoinAndMapOne('internalOwners.user', 'internalOwners.user', 'internalOwner')
      .leftJoinAndMapOne('internalManagers.user', 'internalManagers.user', 'internalManager')
      .leftJoinAndMapOne('internalLeaders.user', 'internalLeaders.user', 'internalLeader')
      .leftJoinAndMapOne('externalOwners.user', 'externalOwners.user', 'externalOwner')
      .leftJoinAndMapOne('externalManagers.user', 'externalManagers.user', 'externalManager')
      .leftJoinAndMapOne('externalLeaders.user', 'externalLeaders.user', 'externalLeader')
      .where({ priority: ProjectPriority.Business });

    if (args.businessCategory) {
      queryBuilder.andWhere('businessCategory.id = :businessCategory', {
        businessCategory: args.businessCategory,
      });
    }

    if (args.industryCategory) {
      queryBuilder.andWhere('industryCategory.id = :industryCategory', {
        industryCategory: args.industryCategory,
      });
    }

    if (args.taskMainCategory) {
      queryBuilder.andWhere('taskMainCategory.id = :taskMainCategory', {
        taskMainCategory: args.taskMainCategory,
      });
    }

    if (args.status) {
      queryBuilder.andWhere('project.status = :status', {
        status: args.status,
      });
    }

    if (args.customer) {
      queryBuilder.andWhere('project.customer = :customer', {
        customer: args.customer,
      });
    }

    const listQueryBuilder = queryBuilder.clone();
    const sumQueryBuilder = queryBuilder.clone();

    return Promise.all([
      listQueryBuilder.skip(args.skip).take(args.take).orderBy('project.createdAt', 'DESC').getManyAndCount(),
      sumQueryBuilder.select('SUM(project.amount)', 'amounts').getRawOne<{ amounts: string }>(),
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
