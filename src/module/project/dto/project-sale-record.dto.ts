import { ProjectSaleRecord } from '@entity';

import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

export class ProjectSaleRecordDto {
  date: string;
  amount: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(projectSaleRecord: ProjectSaleRecord) {
    this.date = toDateFormat(DateTimeFormat.YYYY_MM_DD, projectSaleRecord.date) ?? '';
    this.amount = projectSaleRecord.amount;
    this.createdAt = toISOString(projectSaleRecord.createdAt);
    this.updatedAt = toISOString(projectSaleRecord.updatedAt);
  }
}
