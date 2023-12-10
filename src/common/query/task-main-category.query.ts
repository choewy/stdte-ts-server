import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { TaskMainCategory } from '@entity';

import { EntityQuery } from '../class';
import { TaskMainCategoryQueryFindListArgs } from './types';

export class TaskMainCategoryQuery extends EntityQuery<TaskMainCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TaskMainCategory);
  }

  async countTaskMainCategory() {
    return this.repository.count();
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

  async findTaskMainCategoryById(id: number) {
    return this.repository.findOne({
      relations: { children: true },
      where: { id },
    });
  }

  async findTaskMainCategoryList(args: TaskMainCategoryQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { children: true },
      skip: args.skip,
      take: args.take,
    });
  }

  async insertTaskMainCategory(entity: DeepPartial<TaskMainCategory>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async insertTaskMainCategories(entities: DeepPartial<TaskMainCategory>[]) {
    return this.repository.insert(this.repository.create(entities));
  }

  async updateTaskMainCategory(id: number, entity: DeepPartial<TaskMainCategory>) {
    return this.repository.update({ id }, entity);
  }

  async deleteTaskMainCategory(id: number) {
    return this.repository.delete({ id });
  }
}