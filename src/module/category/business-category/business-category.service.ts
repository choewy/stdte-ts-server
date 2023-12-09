import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  BusinessCategoryCreateBodyDto,
  BusinessCategoryListQueryDto,
  BusinessCategoryParamDto,
  BusinessCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class BusinessCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getBusinessCategories(query: BusinessCategoryListQueryDto) {
    return;
  }

  async getBusinessCategory(param: BusinessCategoryParamDto) {
    return;
  }

  async createBusinessCategory(param: BusinessCategoryCreateBodyDto) {
    return;
  }

  async updateBusinessCategory(param: BusinessCategoryParamDto, body: BusinessCategoryUpdateBodyDto) {
    return;
  }

  async deleteBusinessCategory(param: BusinessCategoryParamDto) {
    return;
  }
}
