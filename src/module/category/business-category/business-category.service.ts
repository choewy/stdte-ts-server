import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistBusinessCategoryException,
  BusinessCategoryQuery,
  InsertDto,
  ListDto,
  NotFoundBusinessCategoryException,
} from '@server/common';

import {
  BusinessCategoryCreateBodyDto,
  BusinessCategoryDto,
  BusinessCategoryListQueryDto,
  BusinessCategoryParamDto,
  BusinessCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class BusinessCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getBusinessCategories(query: BusinessCategoryListQueryDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);

    return new ListDto(query, await businessCategoryQuery.findBusinessCategoryList(query), BusinessCategoryDto);
  }

  async getBusinessCategory(param: BusinessCategoryParamDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const businessCategory = await businessCategoryQuery.findBusinessCategoryById(param.id);

    if (businessCategory == null) {
      throw new NotFoundBusinessCategoryException();
    }

    return new BusinessCategoryDto(businessCategory);
  }

  async createBusinessCategory(body: BusinessCategoryCreateBodyDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const hasBusinessCategory = await businessCategoryQuery.hasBusinessCategoryByName(body.name);

    if (hasBusinessCategory) {
      throw new AlreadyExistBusinessCategoryException();
    }

    return new InsertDto(await businessCategoryQuery.insertBusinessCategory(body));
  }

  async updateBusinessCategory(param: BusinessCategoryParamDto, body: BusinessCategoryUpdateBodyDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const hasBusinessCategory = await businessCategoryQuery.hasBusinessCategoryById(param.id);

    if (hasBusinessCategory === false) {
      throw new NotFoundBusinessCategoryException();
    }

    if (body.name) {
      if (await businessCategoryQuery.hasBusinessCategoryByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistBusinessCategoryException();
      }
    }

    await businessCategoryQuery.updateBusinessCategory(param.id, body);
  }

  async deleteBusinessCategory(param: BusinessCategoryParamDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const hasBusinessCategory = await businessCategoryQuery.hasBusinessCategoryById(param.id);

    if (hasBusinessCategory) {
      throw new AlreadyExistBusinessCategoryException();
    }

    await businessCategoryQuery.deleteBusinessCategory(param.id);
  }
}
