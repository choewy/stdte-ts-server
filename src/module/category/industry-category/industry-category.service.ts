import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import {
  AlreadyExistIndustryCategoryException,
  DownloadDto,
  DownloadFormat,
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
import { IndustryCategoryExcelService } from './industry-category-excel.service';

@Injectable()
export class IndustryCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getIndustryCategories(query: IndustryCategoryListQueryDto) {
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);

    return new ListDto(query, await industryCategoryQuery.findIndustryCategoryList(query), IndustryCategoryDto);
  }

  async createIndustryCategoriesFile() {
    const industryCategories = await new IndustryCategoryQuery(this.dataSource).findAll();

    const wb = new ExcelJS.Workbook();
    const excelService = new IndustryCategoryExcelService();

    excelService.createIndustryCategorySheet(wb, '산업분야', industryCategories);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '산업분야 목록');
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
