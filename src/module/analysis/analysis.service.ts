import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  BusinessCategoryQuery,
  CustomerQuery,
  IndustryCategoryQuery,
  ProjectQuery,
  ProjectRecordQuery,
  TimeRecordQuery,
  UserQuery,
} from '@server/common';

import {
  AnalysisDateRangeQuery,
  AnalysisProjectAmountRowDto,
  AnalysisProjectAmountColDto,
  AnalysisTimeRecordYearRow,
  AnalysisTimeRecordProjectRowDto,
  AnalysisTimeRecordUserRowDto,
  AnalysisTimeRecordColDto,
} from './dto';

@Injectable()
export class AnalysisService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjectRecords(type: 'orders' | 'sales', query: AnalysisDateRangeQuery) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);
    const res = await projectRecordQuery.findProjectOrderRecordAnalysis(type, query);

    const [
      customerYearRaws,
      customerRowRaws,
      businessCategoryYearRaws,
      businessCategoryRowRaws,
      industryCategoryYearRaws,
      industryCategoryRowRaws,
    ] = res;

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const yearRange = e.diff(s, 'years').get('years');

    const customerYears: { year: string; amount: string }[] = [];
    const businessCategoryYears: { year: string; amount: string }[] = [];
    const industryCategoryYears: { year: string; amount: string }[] = [];

    for (let i = 0; i <= yearRange; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');

      customerYears.push({
        year,
        amount: customerYearRaws.find((raw) => raw.year === year)?.amount ?? '0',
      });

      businessCategoryYears.push({
        year,
        amount: businessCategoryYearRaws.find((raw) => raw.year === year)?.amount ?? '0',
      });

      industryCategoryYears.push({
        year,
        amount: industryCategoryYearRaws.find((raw) => raw.year === year)?.amount ?? '0',
      });
    }

    const customerQuery = new CustomerQuery(this.dataSource);
    const customers = await customerQuery.findAll();
    const customerRows: AnalysisProjectAmountRowDto[] = [];

    for (const customer of customers) {
      customerRows.push(
        new AnalysisProjectAmountRowDto(
          customer.id,
          customer.alias,
          customerRowRaws
            .filter(({ id }) => id === customer.id)
            .map((raw) => {
              const total = customerYears.find((row) => row.year === raw.year)?.amount ?? '0';

              return new AnalysisProjectAmountColDto(total, raw);
            }),
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
          businessCategoryRowRaws
            .filter(({ id }) => id === businessCategory.id)
            .map((raw) => {
              const total = businessCategoryYears.find((row) => row.year === raw.year)?.amount ?? '0';

              return new AnalysisProjectAmountColDto(total, raw);
            }),
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
          industryCategoryRowRaws
            .filter(({ id }) => id === industryCategory.id)
            .map((raw) => {
              const total = industryCategoryYears.find((row) => row.year === raw.year)?.amount ?? '0';

              return new AnalysisProjectAmountColDto(total, raw);
            }),
        ),
      );
    }

    return {
      customer: { years: customerYears, rows: customerRows },
      businessCategory: { years: businessCategoryYears, rows: businessCategoryRows },
      industryCategory: { years: industryCategoryYears, rows: industryCategoryRows },
    };
  }

  async getTimesRecords(query: AnalysisDateRangeQuery) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const projects = await projectQuery.findAll();

    const userQuery = new UserQuery(this.dataSource);
    const users = await userQuery.findAll();

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const timeRecordRaws = await timeRecordQuery.findTimeRecordAnalysis(
      [0].concat(projects.map((project) => project.id)),
      [0].concat(users.map((user) => user.id)),
      query,
    );

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const yearRange = e.diff(s, 'years').get('years');

    const yearRows: AnalysisTimeRecordYearRow[] = [];
    const projectRows = projects.map((project) => new AnalysisTimeRecordProjectRowDto(project));
    const userRows = users.map((user) => new AnalysisTimeRecordUserRowDto(user));

    for (let i = 0; i <= yearRange; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');
      const raws = timeRecordRaws.filter((raw) => raw.year === year);
      const time = raws
        .reduce<number>((t, v) => {
          t += Number(v.time);
          return t;
        }, 0)
        .toFixed(2);

      yearRows.push(new AnalysisTimeRecordYearRow(year, time));

      for (const projectRow of projectRows) {
        const time = raws
          .filter((raw) => raw.pid === projectRow.id)
          .reduce<number>((t, v) => {
            t += Number(v.time);
            return t;
          }, 0)
          .toFixed(2);

        projectRow.cols.push(new AnalysisTimeRecordColDto(year, time));
      }
    }

    for (const userRow of userRows) {
      userRow.cols = timeRecordRaws
        .filter((raw) => raw.uid === userRow.id)
        .map((raw) => new AnalysisTimeRecordColDto(raw.year, raw.time));
    }

    return { years: yearRows, projects: projectRows, users: userRows };
  }
}
