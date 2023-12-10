import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CustomerQuery, InsertDto, ListDto, NotFoundCustomerException } from '@server/common';

import {
  CustomerCreateBodyDto,
  CustomerDto,
  CustomerListQueryDto,
  CustomerParamDto,
  CustomerUpdateBodyDto,
} from './dto';

@Injectable()
export class CustomerService {
  constructor(private readonly dataSource: DataSource) {}

  async getCustomers(query: CustomerListQueryDto) {
    const customerQuery = new CustomerQuery(this.dataSource);

    return new ListDto(query, await customerQuery.findCustomerList(query), CustomerDto);
  }

  async getCustomer(param: CustomerParamDto) {
    const customerQuery = new CustomerQuery(this.dataSource);
    const customer = await customerQuery.findCustomerById(param.id);

    if (customer == null) {
      throw new NotFoundCustomerException();
    }

    return new CustomerDto(customer);
  }

  async createCustomer(body: CustomerCreateBodyDto) {
    const customerQuery = new CustomerQuery(this.dataSource);

    return new InsertDto(await customerQuery.insertCustomer(body));
  }

  async updateCustomer(param: CustomerParamDto, body: CustomerUpdateBodyDto) {
    const customerQuery = new CustomerQuery(this.dataSource);
    const hasCustomer = await customerQuery.hasCustomerById(param.id);

    if (hasCustomer === false) {
      throw new NotFoundCustomerException();
    }

    await customerQuery.updateCustomer(param.id, body);
  }

  async deleteCustomer(param: CustomerParamDto) {
    const customerQuery = new CustomerQuery(this.dataSource);
    const hasCustomer = await customerQuery.hasCustomerById(param.id);

    if (hasCustomer === false) {
      throw new NotFoundCustomerException();
    }

    await customerQuery.deleteCustomer(param.id);
  }
}
