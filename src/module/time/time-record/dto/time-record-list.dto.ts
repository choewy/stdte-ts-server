import { TimeRecord } from '@entity';

import { TimeRecordSumMap } from './types';
import { TimeRecordDto } from './time-record.dto';

export class TimeRecordListDto {
  sums: TimeRecordSumMap;
  rows: TimeRecordDto[];

  constructor(sums: TimeRecordSumMap, timeRecords: TimeRecord[]) {
    this.sums = sums;
    this.rows = timeRecords.map((timeRecord) => new TimeRecordDto(timeRecord));
  }
}
