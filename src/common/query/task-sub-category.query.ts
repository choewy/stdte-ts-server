import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { TaskSubCategory } from '@entity';

import { EntityQuery } from '../class';

export class TaskSubCategoryQuery extends EntityQuery<TaskSubCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TaskSubCategory);
  }

  async countTaskSubCategory() {
    return this.repository.count();
  }

  async insertTaskSubCategories(entities: DeepPartial<TaskSubCategory>[]) {
    return this.repository.insert(this.repository.create(entities));
  }
}
