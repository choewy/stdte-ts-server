import ExcelJS from 'exceljs';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CustomerQuery, DownloadDto, DownloadFormat, ListDto, NotFoundCustomerException } from '@server/common';

import { CustomerExcelService } from './customer-excel.service';
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

  async createCustomersFile() {
    const customers = await new CustomerQuery(this.dataSource).findAll();

    const wb = new ExcelJS.Workbook();
    const excelService = new CustomerExcelService();

    excelService.createCustomerSheet(wb, '고객사', customers);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '고객사 목록');
  }

  async createCustomer(body: CustomerCreateBodyDto) {
    const customerQuery = new CustomerQuery(this.dataSource);

    const insert = await customerQuery.insertCustomer(body);
    const customerId = insert.identifiers[0]?.id;

    if (customerId == null) {
      throw new NotFoundCustomerException();
    }

    const customer = await customerQuery.findCustomerById(customerId);

    if (customer == null) {
      throw new NotFoundCustomerException();
    }

    return new CustomerDto(customer);
  }

  async updateCustomer(param: CustomerParamDto, body: CustomerUpdateBodyDto) {
    const customerQuery = new CustomerQuery(this.dataSource);
    const hasCustomer = await customerQuery.hasCustomerById(param.id);

    if (hasCustomer === false) {
      throw new NotFoundCustomerException();
    }

    await customerQuery.updateCustomer(param.id, body);
    const customer = await customerQuery.findCustomerById(param.id);

    if (customer == null) {
      throw new NotFoundCustomerException();
    }

    return new CustomerDto(customer);
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
