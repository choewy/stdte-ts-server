import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import {
  AlreadyExistBusinessCategoryException,
  BusinessCategoryQuery,
  DownloadDto,
  DownloadFormat,
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
import { BusinessCategoryExcelService } from './business-category-excel.service';

@Injectable()
export class BusinessCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getBusinessCategories(query: BusinessCategoryListQueryDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);

    return new ListDto(query, await businessCategoryQuery.findBusinessCategoryList(query), BusinessCategoryDto);
  }

  async createBusinessCategoriesFile() {
    const businessCategories = await new BusinessCategoryQuery(this.dataSource).findAll();

    const wb = new ExcelJS.Workbook();
    const excelService = new BusinessCategoryExcelService();

    excelService.createBusinessCategorySheet(wb, '사업구분', businessCategories);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '사업구분 목록');
  }

  async createBusinessCategory(body: BusinessCategoryCreateBodyDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const hasBusinessCategory = await businessCategoryQuery.hasBusinessCategoryByName(body.name);

    if (hasBusinessCategory) {
      throw new AlreadyExistBusinessCategoryException();
    }

    const insert = await businessCategoryQuery.insertBusinessCategory(body);
    const businessCategoryId = insert.identifiers[0]?.id;

    if (businessCategoryId == null) {
      throw new NotFoundBusinessCategoryException();
    }

    const businessCategory = await businessCategoryQuery.findBusinessCategoryById(businessCategoryId);

    if (businessCategory == null) {
      throw new NotFoundBusinessCategoryException();
    }

    return new BusinessCategoryDto(businessCategory);
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
    const businessCategory = await businessCategoryQuery.findBusinessCategoryById(param.id);

    if (businessCategory == null) {
      throw new NotFoundBusinessCategoryException();
    }

    return new BusinessCategoryDto(businessCategory);
  }

  async deleteBusinessCategory(param: BusinessCategoryParamDto) {
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const hasBusinessCategory = await businessCategoryQuery.hasBusinessCategoryById(param.id);

    if (hasBusinessCategory == null) {
      throw new NotFoundBusinessCategoryException();
    }

    await businessCategoryQuery.deleteBusinessCategory(param.id);
  }
}
