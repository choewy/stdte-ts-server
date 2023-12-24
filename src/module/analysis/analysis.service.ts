import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BusinessCategoryQuery, CustomerQuery, IndustryCategoryQuery, ProjectRecordQuery } from '@server/common';

import {
  AnalysisDateRangeQuery,
  AnalysisProjectAmountListDto,
  AnalysisProjectAmountRowDto,
  AnalysisProjectAmountColDto,
} from './dto';

@Injectable()
export class AnalysisService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjectOrders(query: AnalysisDateRangeQuery) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);
    const [total, yearRaws, customerRaws, businessCategoryRaws, industryCategoryRaws] =
      await projectRecordQuery.findProjectOrderRecordAnalysis(query);

    const amount = total?.amount ?? '0';

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const yearRange = e.diff(s, 'years').get('years');
    const yearRows: { year: string; amount: string }[] = [];

    for (let i = 0; i <= yearRange; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');
      const amount = yearRaws.find((raw) => raw.year === year)?.amount ?? '0';

      yearRows.push({ year, amount });
    }

    const customerQuery = new CustomerQuery(this.dataSource);
    const customers = await customerQuery.findAll();
    const customerRows: AnalysisProjectAmountRowDto[] = [];

    for (const customer of customers) {
      customerRows.push(
        new AnalysisProjectAmountRowDto(
          customer.id,
          customer.alias,
          customerRaws
            .filter(({ id }) => id === customer.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const businessCategories = await businessCategoryQuery.findAll();
    const businessCategoryRows: AnalysisProjectAmountRowDto[] = [];

    for (const businessCategory of businessCategories) {
      businessCategoryRows.push(
        new AnalysisProjectAmountRowDto(
          businessCategory.id,
          businessCategory.name,
          businessCategoryRaws
            .filter(({ id }) => id === businessCategory.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);
    const industryCategories = await industryCategoryQuery.findAll();
    const industryCategoryRows: AnalysisProjectAmountRowDto[] = [];

    for (const industryCategory of industryCategories) {
      industryCategoryRows.push(
        new AnalysisProjectAmountRowDto(
          industryCategory.id,
          industryCategory.name,
          industryCategoryRaws
            .filter(({ id }) => id === industryCategory.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    return new AnalysisProjectAmountListDto(amount, yearRows, customerRows, businessCategoryRows, industryCategoryRows);
  }

  async getProjectSales(query: AnalysisDateRangeQuery) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);
    const [total, yearRaws, customerRaws, businessCategoryRaws, industryCategoryRaws] =
      await projectRecordQuery.findProjectSaleRecordAnalysis(query);

    const amount = total?.amount ?? '0';

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const yearRange = e.diff(s, 'years').get('years');
    const yearRows: { year: string; amount: string }[] = [];

    for (let i = 0; i <= yearRange; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');
      const amount = yearRaws.find((raw) => raw.year === year)?.amount ?? '0';

      yearRows.push({ year, amount });
    }

    const customerQuery = new CustomerQuery(this.dataSource);
    const customers = await customerQuery.findAll();
    const customerRows: AnalysisProjectAmountRowDto[] = [];

    for (const customer of customers) {
      customerRows.push(
        new AnalysisProjectAmountRowDto(
          customer.id,
          customer.alias,
          customerRaws
            .filter(({ id }) => id === customer.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const businessCategories = await businessCategoryQuery.findAll();
    const businessCategoryRows: AnalysisProjectAmountRowDto[] = [];

    for (const businessCategory of businessCategories) {
      businessCategoryRows.push(
        new AnalysisProjectAmountRowDto(
          businessCategory.id,
          businessCategory.name,
          businessCategoryRaws
            .filter(({ id }) => id === businessCategory.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);
    const industryCategories = await industryCategoryQuery.findAll();
    const industryCategoryRows: AnalysisProjectAmountRowDto[] = [];

    for (const industryCategory of industryCategories) {
      industryCategoryRows.push(
        new AnalysisProjectAmountRowDto(
          industryCategory.id,
          industryCategory.name,
          industryCategoryRaws
            .filter(({ id }) => id === industryCategory.id)
            .map((raw) => new AnalysisProjectAmountColDto(amount, raw)),
        ),
      );
    }

    return new AnalysisProjectAmountListDto(amount, yearRows, customerRows, businessCategoryRows, industryCategoryRows);
  }
}
