import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import {
  AlreadyExistIndustryCategoryException,
  IndustryCategoryQuery,
  ListDto,
  NotFoundIndustryCategoryException,
} from '@server/common';

import {
  IndustryCategoryCreateBodyDto,
  IndustryCategoryDto,
  IndustryCategoryListQueryDto,
  IndustryCategoryParamDto,
  IndustryCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class IndustryCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getIndustryCategories(query: IndustryCategoryListQueryDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);

    return new ListDto(query, await industryCategoryQuery.findIndustryCategoryList(query), IndustryCategoryDto);
  }

  async createIndustryCategory(body: IndustryCategoryCreateBodyDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);
    const hasIndustryCategory = await industryCategoryQuery.hasIndustryCategoryByName(body.name);

    if (hasIndustryCategory) {
      throw new AlreadyExistIndustryCategoryException();
    }

    const insert = await industryCategoryQuery.insertIndustryCategory(body);
    const industryCategoryId = insert.identifiers[0]?.id;

    if (industryCategoryId == null) {
      throw new NotFoundIndustryCategoryException();
    }

    const industryCategory = await industryCategoryQuery.findIndustryCategoryById(industryCategoryId);

    if (industryCategory == null) {
      throw new NotFoundIndustryCategoryException();
    }

    return new IndustryCategoryDto(industryCategory);
  }

  async updateIndustryCategory(param: IndustryCategoryParamDto, body: IndustryCategoryUpdateBodyDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);
    const hasIndustryCategory = await industryCategoryQuery.hasIndustryCategoryById(param.id);

    if (hasIndustryCategory === false) {
      throw new NotFoundIndustryCategoryException();
    }

    if (body.name) {
      if (await industryCategoryQuery.hasIndustryCategoryByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistIndustryCategoryException();
      }
    }

    await industryCategoryQuery.updateIndustryCategory(param.id, body);
    const industryCategory = await industryCategoryQuery.findIndustryCategoryById(param.id);

    if (industryCategory == null) {
      throw new NotFoundIndustryCategoryException();
    }

    return new IndustryCategoryDto(industryCategory);
  }

  async deleteIndustryCategory(param: IndustryCategoryParamDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);
    const hasIndustryCategory = await industryCategoryQuery.hasIndustryCategoryById(param.id);

    if (hasIndustryCategory === false) {
      throw new NotFoundIndustryCategoryException();
    }

    await industryCategoryQuery.deleteIndustryCategory(param.id);
  }
}
