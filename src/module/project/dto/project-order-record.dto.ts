import { ProjectOrderRecord } from '@entity';

import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

export class ProjectOrderRecordDto {
  date: string;
  amount: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(projectOrderRecord: ProjectOrderRecord) {
    this.date = toDateFormat(DateTimeFormat.YYYY_MM_DD, projectOrderRecord.date) ?? '';
    this.amount = String(projectOrderRecord.amount);
    this.createdAt = toISOString(projectOrderRecord.createdAt);
    this.updatedAt = toISOString(projectOrderRecord.updatedAt);
  }
}
