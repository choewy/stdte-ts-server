import { TimeRecord } from '@entity';

import { TimeRecordDto } from './time-record.dto';
import { TimeRecordSumDto } from './time-record-sum.dto';

export class TimeRecordRowDto {
  sum: TimeRecordSumDto;
  row: TimeRecordDto;

  constructor(total: string, timeRecord: TimeRecord) {
    this.sum = new TimeRecordSumDto(timeRecord.date, total);
    this.row = new TimeRecordDto(timeRecord);
  }
}
