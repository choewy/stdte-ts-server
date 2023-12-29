import ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';

import { AnalysisProjectRecordResultDto } from './dto';

@Injectable()
export class AnalysisExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  };

  makeProjectRecordSheet(
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
}
