import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { IndustryCategory } from '@entity';

import { EntityQuery } from '../class';
import { IndustryCategoryQueryFindListArgs } from './types';

export class IndustryCategoryQuery extends EntityQuery<IndustryCategory> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, IndustryCategory);
  }

  async hasIndustryCategoryById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasIndustryCategoryByName(name: string) {
    return this.repository.exist({ where: { name } });
  }

  async hasIndustryCategoryByNameOmitId(id: number, name: string) {
    return this.repository.exist({ where: { id: Not(id), name } });
  }

  async findIndustryCategoryList(args: IndustryCategoryQueryFindListArgs) {
    return this.repository.find({
      take: args.take,
      skip: args.skip,
    });
  }

  async insertIndustryCategory(entity: DeepPartial<IndustryCategory>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async updateIndustryCategory(id: number, entity: DeepPartial<IndustryCategory>) {
    return this.repository.update({ id }, entity);
  }

  async deleteIndustryCategory(id: number) {
    return this.repository.delete({ id });
  }
}
