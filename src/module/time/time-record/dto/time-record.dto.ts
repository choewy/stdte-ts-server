import { TimeRecord } from '@entity';
import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

export class TimeRecordDto {
  id: string;
  date: string;
  time: string;
  project: number;
  category: { parent: number; child: number };
  createdAt: string | null;
  updatedAt: string | null;

  constructor(timeRecord: TimeRecord) {
    this.id = timeRecord.id;
    this.date = toDateFormat(DateTimeFormat.YYYY_MM_DD, timeRecord.date) as string;
    this.time = timeRecord.time;
    this.project = timeRecord.project.id;
    this.category = {
      parent: timeRecord.taskMainCategory?.id ?? 0,
      child: timeRecord.taskSubCategory?.id ?? 0,
    };
    this.createdAt = toISOString(timeRecord.createdAt);
    this.updatedAt = toISOString(timeRecord.updatedAt);
  }
}
