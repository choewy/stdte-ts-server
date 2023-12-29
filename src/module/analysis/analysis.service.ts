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

  private createProjectRecordYears(query: AnalysisDateRangeQuery, years: Array<ProjectRecordAnalysisYear[]>) {
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

    const years = this.createProjectRecordYears(query, [
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

  async getProjectRecordsFile(query: AnalysisDateRangeQuery) {
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

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '수주 및 매출 집계');
  }

  private createTimeRecordYears(query: AnalysisDateRangeQuery, raws: TimeRecordAnalysisRaw[]) {
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

  private createTimeRecordProjects(
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

  private createTimeRecordUsers(users: User[], raws: TimeRecordAnalysisRaw[]) {
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

    const years = this.createTimeRecordYears(query, raws);

    return {
      years,
      projects: this.createTimeRecordProjects(projects, raws, years),
      users: this.createTimeRecordUsers(users, raws),
    };
  }

  async getTimeRecordsFile(query: AnalysisDateRangeQuery) {
    const results = await this.getTimeRecords(query);

    const wb = new ExcelJS.Workbook();

    for (let i = 0; i < results.projects.length; i++) {
      const project = results.projects[i];
      const sheetName = `(${i + 1}) ${project.name}`;

      this.analysisExcelService.createTimeRecordSheet(wb, sheetName, project, results.years, results.users);
    }

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '사업별 시간관리 집계');
  }

  async getUserRecords(query: AnalysisDateRangeQuery) {
    const userQuery = new UserQuery(this.dataSource);
    const users = await userQuery.findAll();

    const s = DateTime.fromJSDate(new Date(query.s));
    const e = DateTime.fromJSDate(new Date(query.e));
    const yearRange = e.diff(s, 'years').get('years');

    const yearRows: AnalysisUserRecordYearRowDto[] = [];
    const userRows: AnalysisUserRecordUserRowDto[] = [];

    for (const user of users) {
      if (user.enteringDay == null) {
        continue;
      }

      userRows.push(new AnalysisUserRecordUserRowDto(user));
    }

    const today = DateTime.local();

    for (let i = 0; i <= yearRange; i++) {
      const datetime = s.plus({ year: i });
      const year = datetime.toFormat('yyyy');
      const yearRow = new AnalysisUserRecordYearRowDto(year);

      yearRows.push(yearRow);

      if (datetime.diff(today, 'days').get('days') > 0) {
        continue;
      }

      for (const userRow of userRows) {
        const enterDatetime = DateTime.fromJSDate(new Date(userRow.enteringDay ?? ''));
        const leaveDatetime = DateTime.fromJSDate(new Date(userRow.resignationDay ?? ''));

        const enterDiff = enterDatetime.startOf('year').diff(datetime.startOf('year'), 'years').get('years');
        const leaveDiff = leaveDatetime.startOf('year').diff(datetime.startOf('year'), 'years').get('years');

        if (enterDiff > 0 || leaveDiff < 0) {
          continue;
        }

        const months = Math.floor(datetime.endOf('year').diff(enterDatetime, 'months').get('months'));
        const days = Math.floor(datetime.endOf('year').diff(enterDatetime, 'days').get('days'));

        yearRow.months += months;
        yearRow.days += days;
        yearRow.active += 1;

        if (enterDiff === 0) {
          yearRow.enter += 1;
        }

        if (leaveDiff === 0) {
          yearRow.leave += 1;
        }

        userRow.cols.push(
          new AnalysisuserRecordUserColDto(year, months, days, {
            entered: enterDiff === 0,
            leaved: leaveDiff === 0,
          }),
        );
      }

      if (yearRow.months > 0 && yearRow.days > 0 && yearRow.active > 0) {
        yearRow.avgMonths = Math.round(yearRow.months / yearRow.active);
        yearRow.avgDays = Math.round(yearRow.days / yearRow.active);
      }
    }

    return { years: yearRows, users: userRows };
  }

  async getUserRecordsFile(query: AnalysisDateRangeQuery) {
    const results = await this.getUserRecords(query);

    const rows: Array<string | number>[] = [
      ['', '', ''],
      ['연간통계', '', ''],
      ['', '', ''],
      ['이름', '입사일자', '퇴사일자'],
    ];

    for (const year of results.years) {
      rows[0].push(`${year.year}년`, '', '', '', '', '');
      rows[1].push('총일수', '평균일수', '총개월수', '평균개월수', '입사자수', '퇴사자수');
      rows[2].push(year.days, year.avgDays, year.months, year.avgMonths, year.enter, year.leave);
      rows[3].push('누적근속일수', '', '누적근속개월수', '', '비고', '');
    }

    for (const user of results.users) {
      const row: Array<string | number> = [user.name, user.enteringDay, user.resignationDay];

      for (const year of results.years) {
        const values = new Array(6).fill('');
        const col = user.cols.find((col) => col.year === year.year);

        if (col) {
          values[0] = col.days;
          values[2] = col.months;
          values[4] = [col.descriptions.entered && '입사', col.descriptions.leaved && '퇴사']
            .filter((v) => v)
            .join(', ');
        }

        row.push(...values);
      }

      rows.push(row);
    }

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('인력변동현황', {
      views: [{ state: 'frozen', xSplit: 3, ySplit: 3 }],
    });

    for (let i = 0; i < rows.length; i++) {
      ws.insertRow(i + 1, rows[i]);
      ws.getRow(i + 1).alignment = { vertical: 'middle', horizontal: 'center' };
      ws.getRow(i + 1).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      if (i < 3) {
        continue;
      }

      for (let c = 4; c <= rows[i].length; c += 2) {
        ws.mergeCells(i + 1, c, i + 1, c + 1);
      }
    }

    ws.mergeCells(1, 1, 1, 3);
    ws.mergeCells(2, 1, 3, 3);

    for (let c = 4; c <= rows[0].length; c += 6) {
      ws.mergeCells(1, c, 1, c + 5);
    }

    ws.getColumn(1).width = 10;
    ws.getColumn(2).width = 10;
    ws.getColumn(3).width = 10;

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '인력변동현황');
  }
}
