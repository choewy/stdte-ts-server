import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { Customer } from '@entity';

import { EntityQuery } from '../class';
import { CustomerQueryFindListArgs, FindListArgs } from './types';

export class CustomerQuery extends EntityQuery<Customer> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Customer);
  }

  async hasCustomerById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findAll() {
    return this.repository.find();
  }

  async findCustomerOnlyId(entity?: Customer | null) {
    if (entity == null) {
      return entity;
    }

    return this.repository.findOne({
      select: { id: true },
      where: { id: entity.id },
    });
  }

  async findCustomerList(args: CustomerQueryFindListArgs) {
    return this.repository.findAndCount({
      skip: args.skip,
      take: args.take,
      order: { id: 'ASC' },
    });
  }

  async findCustomerSelectList(args: FindListArgs) {
    return this.repository.findAndCount({
      select: { id: true, kr: true, en: true, alias: true },
      skip: args.skip,
      take: args.take,
      order: { id: 'ASC' },
    });
  }

  async findCustomerById(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async insertCustomer(entity: DeepPartial<Customer>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async updateCustomer(id: number, entity: DeepPartial<Customer>) {
    return this.repository.update({ id }, entity);
  }

  async deleteCustomer(id: number) {
    return this.repository.delete({ id });
  }
}
