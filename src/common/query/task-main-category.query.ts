import { DataSource, DeepPartial, EntityManager, FindOptionsRelations, Not } from 'typeorm';

import { TaskMainCategory } from '@entity';

import { EntityQuery } from '../class';
import { TaskMainCategoryQueryFindListArgs } from './types';

export class TaskMainCategoryQuery extends EntityQuery<TaskMainCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TaskMainCategory);
  }

  async hasTaskMainCategoryById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasTaskMainCategoryByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasTaskMainCategoryByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
  }

  async findAll(relations?: FindOptionsRelations<TaskMainCategory>) {
    return this.repository.find({ relations });
  }

  async findTaskMainCategoryOnlyId(entity?: TaskMainCategory | null) {
    if (entity == null) {
      return entity;
    }

    return this.repository.findOne({
      select: { id: true },
      where: { id: entity.id },
    });
  }

  async findTaskMainCategoryById(id: number, relations: FindOptionsRelations<TaskMainCategory> = {}) {
    return this.repository.findOne({
      relations,
      where: { id },
    });
  }

  async findTaskMainCategoryList(args: TaskMainCategoryQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { children: true },
      skip: args.skip,
      take: args.take,
      order: { id: 'ASC' },
    });
  }

  async insertTaskMainCategory(entity: DeepPartial<TaskMainCategory>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async updateTaskMainCategory(id: number, entity: DeepPartial<TaskMainCategory>) {
    return this.repository.update({ id }, entity);
  }

  async deleteTaskMainCategory(id: number) {
    return this.repository.delete({ id });
  }
}
