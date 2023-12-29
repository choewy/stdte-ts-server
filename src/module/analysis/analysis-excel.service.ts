import ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';

import {
  AnalysisProjectRecordResultDto,
  AnalysisTimeRecordProjectRowDto,
  AnalysisTimeRecordUserRowDto,
  AnalysisTimeRecordYearRow,
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
      rows[1].push(year.amount ? Number(year.amount).toLocaleString('ko-KR') : '', year.amount ? '100%' : '');
    }

    for (const row of result.rows) {
      const worksheelRow: Array<string | number> = [row.row];

      for (const year of result.years) {
        const col = row.cols.find((col) => col.year === year.year);

        worksheelRow.push(
          col?.amount ? Number(col.amount).toLocaleString('ko-KR') : '',
          col?.rate ? `${col?.rate}%` : '',
        );
      }

      rows.push(worksheelRow);
    }

    ws.insertRows(1, rows);

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
    const header: Array<string | number> = ['이름'];
    const total: Array<string | number> = ['합계'];

    for (const year of years) {
      const col = project.cols.find((col) => col.year === year.year);

      header.push(`${year.year}년`);
      total.push(Number(col?.time ?? '0.00'));
    }

    const rows: Array<string | number>[] = [];

    for (const user of users) {
      const row: Array<string | number> = [user.name];

      for (const year of years) {
        const col = user.cols.find((col) => col.pid === project.id && col.year === year.year);

        row.push(Number(col?.time ?? '0.00'));
      }

      rows.push(row);
    }

    ws.insertRows(1, [header].concat(rows).concat([total]));

    return ws;
  }
}
