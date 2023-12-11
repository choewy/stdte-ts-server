import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { BusinessCategory } from '@entity';

import { EntityQuery } from '../class';
import { BusinessCategoryQueryFindListArgs } from './types';

export class BusinessCategoryQuery extends EntityQuery<BusinessCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, BusinessCategory);
  }

  async countBusinessCategories() {
    return this.repository.count();
  }

  async hasBusinessCategoryById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasBusinessCategoryByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasBusinessCategoryByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
  }

  async findBusinessCategoryOnlyId(entity?: BusinessCategory | null) {
    if (entity == null) {
      return entity;
    }

    return this.repository.findOne({
      select: { id: true },
      where: { id: entity.id },
    });
  }

  async findBusinessCategoryById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async findBusinessCategoryList(args: BusinessCategoryQueryFindListArgs) {
    return this.repository.findAndCount({
      take: args.take,
      skip: args.skip,
    });
  }

  async insertBusinessCategory(entity: DeepPartial<BusinessCategory>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async insertBusinessCategories(entities: DeepPartial<BusinessCategory>[]) {
    return this.repository.insert(this.repository.create(entities));
  }

  async updateBusinessCategory(id: number, entity: DeepPartial<BusinessCategory>) {
    return this.repository.update({ id }, entity);
  }

  async deleteBusinessCategory(id: number) {
    return this.repository.delete({ id });
  }
}
