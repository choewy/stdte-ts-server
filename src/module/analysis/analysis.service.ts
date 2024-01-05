import ExcelJS from 'exceljs';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { BusinessCategory, Customer, IndustryCategory, Project, User } from '@entity';
import {
  BusinessCategoryQuery,
  CustomerQuery,
  DownloadDto,
  DownloadFormat,
  IndustryCategoryQuery,
  ProjectQuery,
  ProjectRecordAnalysisRaw,
  ProjectRecordAnalysisYear,
  ProjectRecordQuery,
  TimeRecordAnalysisRaw,
  TimeRecordQuery,
  UserQuery,
  replaceCharacters,
} from '@server/common';

import { AnalysisExcelService } from './analysis-excel.service';
import {
  AnalysisDateRangeQuery,
  AnalysisProjectAmountRowDto,
  AnalysisProjectAmountColDto,
  AnalysisTimeRecordYearRow,
  AnalysisTimeRecordProjectRowDto,
  AnalysisTimeRecordUserRowDto,
  AnalysisTimeRecordColDto,
  AnalysisUserRecordYearRowDto,
  AnalysisUserRecordUserRowDto,
  AnalysisuserRecordUserColDto,
  AnalysisProjectRecordResultDto,
  AnalysisProjectRecordYearDto,
} from './dto';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly analysisExcelService: AnalysisExcelService,
  ) {}

  private createProjectRecordYearRows(query: AnalysisDateRangeQuery, years: Array<ProjectRecordAnalysisYear[]>) {
    const map: Record<'customer' | 'business' | 'industry', AnalysisProjectRecordYearDto[]> = {
      customer: [],
      business: [],
      industry: [],
    };

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const range = e.diff(s, 'years').get('years');

    for (let i = 0; i <= range; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');

      map.customer.push(new AnalysisProjectRecordYearDto(year, years[0]));
      map.business.push(new AnalysisProjectRecordYearDto(year, years[1]));
      map.industry.push(new AnalysisProjectRecordYearDto(year, years[2]));
    }

    return map;
  }

  private createProjectRecordRows(
    entities: [Customer[], BusinessCategory[], IndustryCategory[]],
    years: Array<AnalysisProjectRecordYearDto[]>,
    raws: Array<ProjectRecordAnalysisRaw[]>,
  ) {
    const map: Record<'customer' | 'business' | 'industry', AnalysisProjectAmountRowDto[]> = {
      customer: [],
      business: [],
      industry: [],
    };

    for (let i = 0; i < entities.length; i++) {
      for (const entity of entities[i]) {
        const row = new AnalysisProjectAmountRowDto(
          entity.id,
          (entity as Customer).alias ?? (entity as BusinessCategory | IndustryCategory).name,
          raws[i].filter(({ id }) => id === entity.id).map((raw) => new AnalysisProjectAmountColDto(years[i], raw)),
        );

        switch (i) {
          case 0:
            map.customer.push(row);
            break;

          case 1:
            map.business.push(row);
            break;

          case 2:
            map.industry.push(row);
            break;
        }
      }
    }

    return map;
  }

  async getProjectRecords(type: 'orders' | 'sales', query: AnalysisDateRangeQuery) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);

    const [groupByCustomer, groupByBusinessCategory, groupByIndustryCategory] = await Promise.all([
      projectRecordQuery.findProjectRecordAnalysisGroupByCustomers(type, query),
      projectRecordQuery.findProjectRecordAnalysisGroupByBusinessCategory(type, query),
      projectRecordQuery.findProjectRecordAnalysisGroupByIndustryCategory(type, query),
    ]);

    const years = this.createProjectRecordYearRows(query, [
      groupByCustomer.years,
      groupByBusinessCategory.years,
      groupByIndustryCategory.years,
    ]);

    const customerQuery = new CustomerQuery(this.dataSource);
    const businessCategoryQuery = new BusinessCategoryQuery(this.dataSource);
    const industryCategoryQuery = new IndustryCategoryQuery(this.dataSource);

    const rows = this.createProjectRecordRows(
      await Promise.all([customerQuery.findAll(), businessCategoryQuery.findAll(), industryCategoryQuery.findAll()]),
      [years.customer, years.business, years.industry],
      [groupByCustomer.raws, groupByBusinessCategory.raws, groupByIndustryCategory.raws],
    );

    return {
      customer: new AnalysisProjectRecordResultDto(years.customer, rows.customer),
      businessCategory: new AnalysisProjectRecordResultDto(years.business, rows.business),
      industryCategory: new AnalysisProjectRecordResultDto(years.industry, rows.industry),
    };
  }

  async createProjectRecordsFile(query: AnalysisDateRangeQuery) {
    const [orders, sales] = await Promise.all([
      this.getProjectRecords('orders', query),
      this.getProjectRecords('sales', query),
    ]);

    const wb = new ExcelJS.Workbook();

    this.analysisExcelService.createProjectRecordSheet(wb, '수주_고객사별', '고객사', orders.customer);
    this.analysisExcelService.createProjectRecordSheet(wb, '수주_사업구분별', '사업구분', orders.businessCategory);
    this.analysisExcelService.createProjectRecordSheet(wb, '수주_산업분야별', '산업분야', orders.industryCategory);
    this.analysisExcelService.createProjectRecordSheet(wb, '매출_고객사별', '고객사', sales.customer);
    this.analysisExcelService.createProjectRecordSheet(wb, '매출_사업구분별', '사업구분', sales.businessCategory);
    this.analysisExcelService.createProjectRecordSheet(wb, '매출_산업분야별', '산업분야', sales.industryCategory);
    this.analysisExcelService.createProjectRecordCustomerSheet(wb, 'ref_고객사', orders.customer.rows);
    this.analysisExcelService.createProjectRecordCustomerSheet(wb, 'ref_사업구분', orders.businessCategory.rows);
    this.analysisExcelService.createProjectRecordCustomerSheet(wb, 'ref_산업분야', orders.industryCategory.rows);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '수주 및 매출');
  }

  private createTimeRecordYearRows(query: AnalysisDateRangeQuery, raws: TimeRecordAnalysisRaw[]) {
    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));

    const range = e.diff(s, 'years').get('years');
    const years: AnalysisTimeRecordYearRow[] = [];

    for (let i = 0; i <= range; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');
      const targets = raws.filter((raw) => raw.year === year);

      years.push(
        new AnalysisTimeRecordYearRow(
          year,
          targets
            .reduce<number>((t, v) => {
              t += Number(v.time);
              return t;
            }, 0)
            .toFixed(2),
        ),
      );
    }

    return years;
  }

  private createTimeRecordProjectRows(
    projects: Project[],
    raws: TimeRecordAnalysisRaw[],
    years: AnalysisTimeRecordYearRow[],
  ) {
    const rows = projects.map((project) => new AnalysisTimeRecordProjectRowDto(project));

    for (const year of years) {
      const targets = raws.filter((raw) => raw.year === year.year);

      for (const row of rows) {
        row.cols.push(
          new AnalysisTimeRecordColDto(
            year.year,
            targets
              .filter((raw) => raw.pid === row.id)
              .reduce<number>((t, v) => {
                t += Number(v.time);
                return t;
              }, 0)
              .toFixed(2),
          ),
        );
      }
    }

    return rows;
  }

  private createTimeRecordUserRows(users: User[], raws: TimeRecordAnalysisRaw[]) {
    const rows = users.map((user) => new AnalysisTimeRecordUserRowDto(user));

    for (const row of rows) {
      row.cols = raws
        .filter((raw) => raw.uid === row.id)
        .map((raw) => new AnalysisTimeRecordColDto(raw.year, raw.time, raw.pid));
    }

    return rows;
  }

  async getTimeRecords(query: AnalysisDateRangeQuery) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const projects = await projectQuery.findAllByActive();

    const userQuery = new UserQuery(this.dataSource);
    const users = await userQuery.findAllByActive();

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const raws = await timeRecordQuery.findTimeRecordAnalysis(
      [0].concat(projects.map((project) => project.id)),
      [0].concat(users.map((user) => user.id)),
      query,
    );

    const years = this.createTimeRecordYearRows(query, raws);

    return {
      years,
      projects: this.createTimeRecordProjectRows(projects, raws, years),
      users: this.createTimeRecordUserRows(users, raws),
    };
  }

  async createTimeRecordsFile(query: AnalysisDateRangeQuery) {
    const results = await this.getTimeRecords(query);

    const wb = new ExcelJS.Workbook();

    for (const project of results.projects) {
      const sheetName = replaceCharacters(`${project.id}_${project.name}`);

      this.analysisExcelService.createTimeRecordSheet(wb, sheetName, project, results.years, results.users);
    }

    this.analysisExcelService.createTimeRecordProjectSheet(wb, 'ref_사업 목록', results.projects);
    this.analysisExcelService.createTimeRecordUserSheet(wb, 'ref_구성원 목록', results.users);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '사업별 시간관리 집계');
  }

  private createUserRecordYearRows(query: AnalysisDateRangeQuery) {
    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const range = e.diff(s, 'years').get('years');

    const rows: AnalysisUserRecordYearRowDto[] = [];

    for (let i = 0; i <= range; i++) {
      const year = s.plus({ year: i }).toFormat('yyyy');
      const row = new AnalysisUserRecordYearRowDto(year);

      rows.push(row);
    }

    return rows;
  }

  private createUserRecordUserRows(users: User[], years: AnalysisUserRecordYearRowDto[]) {
    const today = DateTime.local();
    const rows = users.map((user) => new AnalysisUserRecordUserRowDto(user));

    for (const year of years) {
      const datetime = DateTime.fromFormat(year.year, 'yyyy');

      if (datetime.diff(today, 'days').get('days') > 0) {
        continue;
      }

      for (const row of rows) {
        if (row.enteringDay === '') {
          continue;
        }

        const enterDatetime = DateTime.fromJSDate(new Date(row.enteringDay ?? ''));
        const leaveDatetime = DateTime.fromJSDate(new Date(row.resignationDay ?? ''));

        const enterDiff = enterDatetime.startOf('year').diff(datetime.startOf('year'), 'years').get('years');
        const leaveDiff = leaveDatetime.startOf('year').diff(datetime.startOf('year'), 'years').get('years');

        if (enterDiff > 0 || leaveDiff < 0) {
          continue;
        }

        const months = Math.floor(datetime.endOf('year').diff(enterDatetime, 'months').get('months'));
        const days = Math.floor(datetime.endOf('year').diff(enterDatetime, 'days').get('days'));

        row.cols.push(
          new AnalysisuserRecordUserColDto(year.year, months, days, {
            entered: enterDiff === 0,
            leaved: leaveDiff === 0,
          }),
        );

        year.months += months;
        year.days += days;
        year.active += 1;
        year.enter += enterDiff === 0 ? 1 : 0;
        year.leave += leaveDiff === 0 ? 1 : 0;
      }

      if (year.months === 0 || year.days === 0 || year.active === 0) {
        continue;
      }

      year.avgMonths = Math.round(year.months / year.active);
      year.avgDays = Math.round(year.days / year.active);
    }

    return rows;
  }

  async getUserRecords(query: AnalysisDateRangeQuery) {
    const userQuery = new UserQuery(this.dataSource);

    const years = this.createUserRecordYearRows(query);
    const users = this.createUserRecordUserRows(await userQuery.findAll(), years);

    return { years, users };
  }

  async createUserRecordsFile(query: AnalysisDateRangeQuery) {
    const results = await this.getUserRecords(query);
    const wb = new ExcelJS.Workbook();

    this.analysisExcelService.createUserRecordSheet(wb, '인력변동현황', results.years, results.users);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '인력변동현황');
  }
}
