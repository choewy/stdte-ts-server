import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerCreateBodyDto, CustomerListQueryDto, CustomerParamDto, CustomerUpdateBodyDto } from './dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(@Query() query: CustomerListQueryDto) {
    return this.customerService.getCustomers(query);
  }

  @Get(':id(\\d+)')
  async getCustomer(@Param() param: CustomerParamDto) {
    return this.customerService.getCustomer(param);
  }

  @Post()
  async createCustomer(@Body() body: CustomerCreateBodyDto) {
    return this.customerService.createCustomer(body);
  }

  @Patch(':id(\\d+)')
  async updateCustomer(@Param() param: CustomerParamDto, @Body() body: CustomerUpdateBodyDto) {
    return this.customerService.updateCustomer(param, body);
  }

  @Delete(':id(\\d+)')
  async deleteCustomer(@Param() param: CustomerParamDto) {
    return this.customerService.deleteCustomer(param);
  }
}
