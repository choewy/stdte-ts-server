import { TimeRecord } from '@entity';
import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

import { TimeRecordProjectDto } from './time-record-project.dto';
import { TImeRecordTaskMainCategoryDto } from './time-record-task-main-category.dto';
import { TimeRecordTaskSubCategoryDto } from './time-record-task-sub-category.dto';

export class TimeRecordDto {
  id: string;
  date: string;
  time: string;
  project: TimeRecordProjectDto;
  taskMainCategory: TImeRecordTaskMainCategoryDto;
  taskSubCategory: TimeRecordTaskSubCategoryDto;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(timeRecord: TimeRecord) {
    this.id = timeRecord.id;
    this.date = toDateFormat(DateTimeFormat.YYYY_MM_DD, timeRecord.date) as string;
    this.time = timeRecord.time;
    this.project = new TimeRecordProjectDto(timeRecord.project);
    this.taskMainCategory = new TImeRecordTaskMainCategoryDto(timeRecord.taskMainCategory);
    this.taskSubCategory = new TimeRecordTaskSubCategoryDto(timeRecord.taskSubCategory);
    this.createdAt = toISOString(timeRecord.createdAt);
    this.updatedAt = toISOString(timeRecord.updatedAt);
  }
}
