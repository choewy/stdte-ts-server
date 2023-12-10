import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { Customer } from '@entity';

import { EntityQuery } from '../class';
import { CustomerQueryFindListArgs } from './types';

export class CustomerQuery extends EntityQuery<Customer> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Customer);
  }

  async hasCustomerById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findCustomerList(args: CustomerQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { projects: true },
      skip: args.skip,
      take: args.take,
    });
  }

  async findCustomerById(id: number) {
    return this.repository.findOne({
      relations: { projects: true },
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
