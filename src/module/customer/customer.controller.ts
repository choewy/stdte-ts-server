import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { CustomerService } from './customer.service';
import { CustomerCreateBodyDto, CustomerListQueryDto, CustomerParamDto, CustomerUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @SetRolePolicy({ customer: RolePolicyLevel.Read })
  async getCustomers(@Query() query: CustomerListQueryDto) {
    return this.customerService.getCustomers(query);
  }

  @Get(':id(\\d+)')
  @SetRolePolicy({ customer: RolePolicyLevel.Read })
  async getCustomer(@Param() param: CustomerParamDto) {
    return this.customerService.getCustomer(param);
  }

  @Post()
  @SetRolePolicy({ customer: RolePolicyLevel.Create })
  async createCustomer(@Body() body: CustomerCreateBodyDto) {
    return this.customerService.createCustomer(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ customer: RolePolicyLevel.Update })
  async updateCustomer(@Param() param: CustomerParamDto, @Body() body: CustomerUpdateBodyDto) {
    return this.customerService.updateCustomer(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ customer: RolePolicyLevel.Delete })
  async deleteCustomer(@Param() param: CustomerParamDto) {
    return this.customerService.deleteCustomer(param);
  }
}
