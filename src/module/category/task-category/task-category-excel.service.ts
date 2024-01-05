import ExcelJS from 'exceljs';

import { TaskMainCategory } from '@entity';
import { replaceCharacters } from '@server/common';

export class TaskCategoryExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', ySplit: 2 }],
  };

  createTaskCategorySheet(wb: ExcelJS.Workbook, sheetName: string, taskCategories: TaskMainCategory[]) {
    const ws = wb.addWorksheet(replaceCharacters(sheetName), this.WORKSHEET_OPTIONS);

    const rows: Array<string | number>[] = [
      ['', '대분류', '', '', '소분류', ''],
      ['PK', '대분류명', '비고', 'PK', '소분류명', '비고'],
    ];

    for (const mainCategory of taskCategories) {
      const row: Array<string | number> = [mainCategory.id, mainCategory.name, mainCategory.description ?? ''];

      rows.push(row);

      for (let i = 0; i < mainCategory.children.length; i++) {
        const subCategory = mainCategory.children[i];

        if (i === 0) {
          row.push(subCategory.id, subCategory.name, subCategory.description ?? '');
        } else {
          rows.push(['', '', '', subCategory.id, subCategory.name, subCategory.description ?? '']);
        }
      }
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

    ws.mergeCells(1, 1, 1, 3);
    ws.mergeCells(1, 4, 1, 6);
    ws.getColumn(1).hidden = true;
    ws.getColumn(2).width = 20;
    ws.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(3).width = 50;
    ws.getColumn(4).hidden = true;
    ws.getColumn(5).width = 20;
    ws.getColumn(5).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getColumn(6).width = 50;

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }
}
