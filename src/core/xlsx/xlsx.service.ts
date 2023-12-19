import { v4 } from 'uuid';
import { utils, WorkSheet, writeFile } from 'xlsx';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';

export class XlsxService {
  private readonly DIR_NAME = 'xlsx';

  constructor() {
    if (existsSync(this.DIR_NAME)) {
      return;
    }

    mkdirSync(this.DIR_NAME);
  }

  protected generateFilePath(): string {
    const filename = [v4(), Date.now(), 'xlsx'].join('.');

    return [this.DIR_NAME, filename].join('/');
  }

  fromObjects(objects: object[]) {
    return utils.json_to_sheet(objects);
  }

  save(
    worksheets: {
      sheet: WorkSheet;
      name: string;
    }[],
  ) {
    const workbook = utils.book_new();

    for (const worksheet of worksheets) {
      utils.book_append_sheet(workbook, worksheet.sheet, worksheet.name);
    }

    const path = this.generateFilePath();

    writeFile(workbook, path);

    const buffer = readFileSync(path);

    unlinkSync(path);

    return buffer;
  }
}
