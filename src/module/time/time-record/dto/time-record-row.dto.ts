import { TimeRecord } from '@entity';

import { TimeRecordDto } from './time-record.dto';

export class TimeRecordRowDto {
  sum: string;
  row: TimeRecordDto;

  constructor(sum: string, timeRecord: TimeRecord) {
    this.sum = sum;
    this.row = new TimeRecordDto(timeRecord);
  }
}
