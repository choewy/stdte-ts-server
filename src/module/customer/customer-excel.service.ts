import ExcelJS from 'exceljs';

import { Customer } from '@entity';

export class CustomerExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }],
  };

  createCustomerSheet(wb: ExcelJS.Workbook, sheetName: string, customers: Customer[]) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const rows: Array<string | number>[] = [['PK', '별칭', '국문명', '영문명', '비고']];

    for (const customer of customers) {
      rows.push([customer.id, customer.alias, customer.kr, customer.en, customer.description ?? '']);
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

    for (const c of [2, 3, 4]) {
      ws.getColumn(c).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    ws.getColumn(1).hidden = true;
    ws.getColumn(2).width = 20;
    ws.getColumn(3).width = 20;
    ws.getColumn(4).width = 20;
    ws.getColumn(5).width = 50;

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }
}
