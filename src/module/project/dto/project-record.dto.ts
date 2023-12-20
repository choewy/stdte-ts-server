import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

export class ProjectRecordDto {
  id: number;
  date: string;
  amount: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(projectRecord: ProjectOrderRecord | ProjectSaleRecord) {
    this.id = projectRecord.id;
    this.date = toDateFormat(DateTimeFormat.YYYY_MM_DD, projectRecord.date) ?? '';
    this.amount = projectRecord.amount;
    this.description = projectRecord.description ?? '';
    this.createdAt = toISOString(projectRecord.createdAt);
    this.updatedAt = toISOString(projectRecord.updatedAt);
  }
}
