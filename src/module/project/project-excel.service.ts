import ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';
import { BusinessCategory, Customer, IndustryCategory, Project, ProjectStatus, TaskMainCategory } from '@entity';
import { DateTime } from 'luxon';

@Injectable()
export class ProjectExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }],
  };

  private readonly STATUS: Record<ProjectStatus, string> = {
    [ProjectStatus.Wating]: '수주',
    [ProjectStatus.Active]: '진행',
    [ProjectStatus.Complete]: '준공',
    [ProjectStatus.AfterService]: 'A/S',
    [ProjectStatus.Stop]: '중단',
    [ProjectStatus.LeavingOut]: '탈락',
  };

  createCustomerSheet(wb: ExcelJS.Workbook, sheetName: string, customers: Customer[]) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const head: Array<string | number> = ['PK', '고객사'];
    const rows: Array<string | number>[] = [head];

    for (const customer of customers) {
      rows.push([customer.id, customer.alias]);
    }

    ws.insertRows(1, rows);

    return ws;
  }

  createBusinessCategorySheet(wb: ExcelJS.Workbook, sheetName: string, businessCategories: BusinessCategory[]) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const head: Array<string | number> = ['PK', '사업구분'];
    const rows: Array<string | number>[] = [head];

    for (const businessCategory of businessCategories) {
      rows.push([businessCategory.id, businessCategory.name]);
    }

    ws.insertRows(1, rows);

    return ws;
  }

  createIndustryCategorySheet(wb: ExcelJS.Workbook, sheetName: string, industryCategoires: IndustryCategory[]) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const head: Array<string | number> = ['PK', '산업분야'];
    const rows: Array<string | number>[] = [head];

    for (const industryCategory of industryCategoires) {
      rows.push([industryCategory.id, industryCategory.name]);
    }

    ws.insertRows(1, rows);

    return ws;
  }

  createTaskMainCategorySheet(wb: ExcelJS.Workbook, sheetName: string, taskMainCategories: TaskMainCategory[]) {
    const ws = wb.addWorksheet(sheetName, this.WORKSHEET_OPTIONS);

    const head: Array<string | number> = ['PK', '산업분야'];
    const rows: Array<string | number>[] = [head];

    for (const taskMainCategory of taskMainCategories) {
      rows.push([taskMainCategory.id, taskMainCategory.name]);
    }

    ws.insertRows(1, rows);

    return ws;
  }

  createProjectSheet(wb: ExcelJS.Workbook, sheetName: string, projects: Project[]) {
    const ws = wb.addWorksheet(sheetName, { views: [{ state: 'frozen', xSplit: 3, ySplit: 2 }] });

    const head: Array<string | number>[] = [
      [
        '',
        '사업정보',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '담당자(대외)',
        '',
        '',
        '담당자(대내)',
        '',
        '',
        '기간',
        '',
        '',
        '시간관리',
        '',
      ],
      [
        'PK',
        '약어',
        '사업명',
        '난이도',
        '사업구분',
        '산업분야',
        '고객사',
        '금액',
        '상태',
        '비고',
        'PO',
        'PM',
        'PL',
        'PO',
        'PM',
        'PL',
        '착수',
        '준공',
        '개월수',
        '수행업무구분',
        '노출여부',
      ],
    ];

    const rows: Array<string | number | Date>[] = head;

    for (const project of projects) {
      let months = 0;

      if (project.startDate && project.endDate) {
        const startDate = DateTime.fromJSDate(new Date(project.startDate));
        const endDate = DateTime.fromJSDate(new Date(project.endDate));

        months = Math.floor(endDate.diff(startDate, 'months').get('months'));
      }

      const row: Array<string | number | Date> = [
        project.id,
        project.code ?? '',
        project.name,
        Number(project.difficulty),
        project.businessCategory?.name ?? '',
        project.industryCategory?.name ?? '',
        project.customer?.alias ?? '',
        Number(project.amount ?? '0'),
        this.STATUS[project.status],
        project.description ?? '',
        project.externalOwners.map((user) => user.user.name).join(', '),
        project.externalManagers.map((user) => user.user.name).join(', '),
        project.externalLeaders.map((user) => user.user.name).join(', '),
        project.internalOwners.map((user) => user.user.name).join(', '),
        project.internalManagers.map((user) => user.user.name).join(', '),
        project.internalLeaders.map((user) => user.user.name).join(', '),
        project.startDate ? new Date(project.startDate) : '',
        project.endDate ? new Date(project.endDate) : '',
        months,
        project.taskMainCategory?.name ?? '',
        project.canExpose ? 'Y' : 'N',
      ];

      rows.push(row);
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

    for (const c of [2, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]) {
      ws.getColumn(c).alignment = { vertical: 'middle', horizontal: 'center' };

      if (c === 4) {
        ws.getColumn(c).numFmt = '0.0';
      }

      if ([17, 18].includes(c)) {
        ws.getColumn(c).width = 15;
        ws.getColumn(c).numFmt = 'yyyy-mm-dd';
      }
    }

    ws.getColumn(1).hidden = true;

    ws.getColumn(3).width = 80;
    ws.getColumn(7).width = 30;
    ws.getColumn(10).width = 50;

    for (const c of [8, 11, 12, 13, 14, 15, 16, 20]) {
      ws.getColumn(c).width = 20;

      if (c === 8) {
        ws.getColumn(c).numFmt = '#,##0';
        ws.getColumn(c).alignment = { vertical: 'middle', horizontal: 'right' };
      }
    }

    ws.mergeCells(1, 2, 1, 10);
    ws.mergeCells(1, 11, 1, 13);
    ws.mergeCells(1, 14, 1, 16);
    ws.mergeCells(1, 17, 1, 19);
    ws.mergeCells(1, 20, 1, 21);
    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }
}
