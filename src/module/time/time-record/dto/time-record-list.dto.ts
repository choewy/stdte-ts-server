import { TimeRecord } from '@entity';

import { TimeRecordSumMap } from './types';
import { TimeRecordDto } from './time-record.dto';
import { TimeRecordSumDto } from './time-record-sum.dto';

export class TimeRecordListDto {
  sums: TimeRecordSumDto[];
  rows: TimeRecordDto[];

  constructor(sums: TimeRecordSumMap, timeRecords: TimeRecord[]) {
    this.sums = Object.entries(sums).map(([date, total]) => new TimeRecordSumDto(date, total));
    this.rows = timeRecords.map((timeRecord) => new TimeRecordDto(timeRecord));
  }
}
