import ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';

import {
  AnalysisProjectRecordResultDto,
  AnalysisTimeRecordProjectRowDto,
  AnalysisTimeRecordUserRowDto,
  AnalysisTimeRecordYearRow,
  AnalysisUserRecordUserRowDto,
  AnalysisUserRecordYearRowDto,
} from './dto';

@Injectable()
export class AnalysisExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  };

  createProjectRecordSheet(
    wb: ExcelJS.Workbook,
    sheetname: string,
    header: string,
    result: AnalysisProjectRecordResultDto,
  ) {
    const ws = wb.addWorksheet(sheetname, this.WORKSHEET_OPTIONS);
    const rows: Array<string | number>[] = [[header], ['합계']];

    for (const year of result.years) {
      rows[0].push(`${year.year}년`, '%');
      rows[1].push(year.amount ? Number(year.amount) : 0, 1);
    }

    for (const row of result.rows) {
      const worksheelRow: Array<string | number> = [row.row];

      for (const year of result.years) {
        const col = row.cols.find((col) => col.year === year.year);

        worksheelRow.push(col?.amount ? Number(col.amount) : 0, col?.rate ? Number(col.rate) / 100 : 0);
      }

      rows.push(worksheelRow);
    }

    ws.insertRows(1, rows);

    for (let i = 1; i <= rows.length; i++) {
      ws.getRow(i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    for (let i = 2; i <= rows[0].length; i++) {
      if (i % 2 === 1) {
        ws.getColumn(i).numFmt = '0.00%';
        ws.getColumn(i).alignment = { vertical: 'middle', horizontal: 'right' };
      } else {
        ws.getColumn(i).numFmt = '#,##0';
        ws.getColumn(i).alignment = { vertical: 'middle', horizontal: 'right' };
      }
    }

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }

  createTimeRecordSheet(
    wb: ExcelJS.Workbook,
    sheetName: string,
    project: AnalysisTimeRecordProjectRowDto,
    years: AnalysisTimeRecordYearRow[],
    users: AnalysisTimeRecordUserRowDto[],
  ) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);
    const head: Array<string | number> = ['이름'];
    const total: Array<string | number> = ['합계'];

    for (const year of years) {
      const col = project.cols.find((col) => col.year === year.year);

      head.push(`${year.year}년`);
      total.push(Number(col?.time ?? '0.00'));
    }

    const rows: Array<string | number>[] = [head];

    for (const user of users) {
      const row: Array<string | number> = [user.name];

      for (const year of years) {
        const col = user.cols.find((col) => col.pid === project.id && col.year === year.year);

        row.push(Number(col?.time ?? '0'));
      }

      rows.push(row);
    }

    rows.push(total);

    ws.insertRows(1, rows);

    for (let i = 1; i <= rows.length; i++) {
      ws.getRow(i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    for (let i = 2; i <= rows[0].length; i++) {
      ws.getColumn(i).alignment = { vertical: 'middle', horizontal: 'right' };
    }

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }

  createUserRecordSheet(
    wb: ExcelJS.Workbook,
    sheetName: string,
    years: AnalysisUserRecordYearRowDto[],
    users: AnalysisUserRecordUserRowDto[],
  ) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const head: Array<string | number> = new Array(3).fill('');
    const stathead: Array<string | number> = ['연간통계'].concat(new Array(2).fill(''));
    const statvalue: Array<string | number> = new Array(3).fill('');
    const cols: Array<string | number> = ['이름', '입사일자', '퇴사일자'];

    for (const year of years) {
      head.push(`${year.year}년`, ...new Array(5).fill(''));
      stathead.push('총일수', '평균일수', '총개월수', '평균개월수', '입사자수', '퇴사자수');
      statvalue.push(year.days, year.avgDays, year.months, year.avgMonths, year.enter, year.leave);
      cols.push('누적근속일수', '', '누적근속개월수', '', '비고', '');
    }

    const rows: Array<Date | string | number>[] = [head, stathead, statvalue, cols];

    for (const user of users) {
      const row: Array<Date | string | number> = [
        user.name,
        user.enteringDay ? new Date(user.enteringDay) : '',
        user.resignationDay ? new Date(user.resignationDay) : '',
      ];

      for (const year of years) {
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

    ws.insertRows(1, rows);
    ws.mergeCells(1, 1, 1, 3);
    ws.mergeCells(2, 1, 3, 3);

    for (let c = 4; c <= rows[0].length; c += 6) {
      ws.mergeCells(1, c, 1, c + 5);
    }

    for (let i = 0; i < rows.length; i++) {
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

    for (let i = 4; i <= rows[0].length; i += 1) {
      if ([2, 3].includes(i % 6)) {
        ws.getColumn(i).alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        ws.getColumn(i).alignment = { vertical: 'middle', horizontal: 'right' };
        ws.getColumn(i).numFmt = '#,##0';
      }
    }

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(3).alignment = { vertical: 'middle', horizontal: 'right' };
    ws.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(1).width = 10;
    ws.getColumn(2).width = 10;
    ws.getColumn(3).width = 10;
    ws.getColumn(2).numFmt = 'yyyy-mm-dd';
    ws.getColumn(3).numFmt = 'yyyy-mm-dd';

    return ws;
  }
}
