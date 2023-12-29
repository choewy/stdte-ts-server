import ExcelJS from 'exceljs';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  BusinessCategoryQuery,
  CustomerQuery,
  DownloadDto,
  DownloadFormat,
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
  AnalysisUserRecordYearRowDto,
  AnalysisUserRecordUserRowDto,
  AnalysisuserRecordUserColDto,
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

  async getProjectRecordsFile(query: AnalysisDateRangeQuery) {}

  async getTimeRecords(query: AnalysisDateRangeQuery) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const projects = await projectQuery.findAllByActive();

    const userQuery = new UserQuery(this.dataSource);
    const users = await userQuery.findAllByActive();

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
        .map((raw) => new AnalysisTimeRecordColDto(raw.year, raw.time, raw.pid));
    }

    return { years: yearRows, projects: projectRows, users: userRows };
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

  async getTimeRecordsFile(query: AnalysisDateRangeQuery) {
    const results = await this.getTimeRecords(query);
    const wb = new ExcelJS.Workbook();

    const header: Array<string | number> = ['이름'];

    for (const year of results.years) {
      header.push(`${year.year}년`);
    }

    for (let i = 0; i < results.projects.length; i++) {
      const project = results.projects[i];

      const ws = wb.addWorksheet(`(${i + 1}) ${project.name}`, {
        views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
      });

      const rows = [header];

      for (const user of results.users) {
        const row: Array<string | number> = [user.name];

        for (const year of results.years) {
          row.push(Number(user.cols.find((col) => col.pid === project.id && col.year === year.year)?.time ?? '0.00'));
        }

        rows.push(row);
      }

      const row: Array<string | number> = ['합계'];

      for (const year of results.years) {
        row.push(Number(project.cols.find((col) => col.year === year.year)?.time ?? '0.00'));
      }

      rows.push(row);
      ws.insertRows(1, rows);
    }

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '사업별 시간관리 집계');
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
