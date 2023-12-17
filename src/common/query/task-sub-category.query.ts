import { DataSource, DeepPartial, EntityManager, FindOptionsRelations } from 'typeorm';

import { TaskSubCategory } from '@entity';

import { EntityQuery } from '../class';

export class TaskSubCategoryQuery extends EntityQuery<TaskSubCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TaskSubCategory);
  }

  async countTaskSubCategory() {
    return this.repository.count();
  }

  async hasTaskSubCategoryById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findTaskSubCategoryById(id: number, relations: FindOptionsRelations<TaskSubCategory> = {}) {
    return this.repository.findOne({
      relations,
      where: { id },
    });
  }

  async insertTaskSubCategory(entity: DeepPartial<TaskSubCategory>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async insertTaskSubCategories(entities: DeepPartial<TaskSubCategory>[]) {
    return this.repository.insert(this.repository.create(entities));
  }

  async updateTaskSubCategory(id: number, entity: DeepPartial<TaskSubCategory>) {
    return this.repository.update({ id }, entity);
  }

  async deleteTaskSubCategory(id: number) {
    return this.repository.delete({ id });
  }
}
