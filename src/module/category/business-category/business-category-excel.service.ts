import ExcelJS from 'exceljs';

import { BusinessCategory } from '@entity';
import { replaceCharacters } from '@server/common';

export class BusinessCategoryExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', ySplit: 1 }],
  };

  createBusinessCategorySheet(wb: ExcelJS.Workbook, sheetName: string, businessCategories: BusinessCategory[]) {
    const ws = wb.addWorksheet(replaceCharacters(sheetName), this.WORKSHEET_OPTIONS);

    const rows: Array<string | number>[] = [['PK', '사업구분명', '비고']];

    for (const businessCategory of businessCategories) {
      rows.push([businessCategory.id, businessCategory.name, businessCategory.description ?? '']);
    }

    ws.insertRows(1, rows);

    for (let r = 1; r <= rows.length; r++) {
      ws.getRow(r).alignment = { vertical: 'middle' };
      ws.getRow(r).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    ws.getColumn(1).hidden = true;
    ws.getColumn(2).width = 20;
    ws.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(3).width = 50;

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }
}
