import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ListDto, TimeRecordLogQuery } from '@server/common';

import { TimeRecordLogDto } from './dto';

@Injectable()
export class TimeRecordLogService {
  constructor(private readonly dataSource: DataSource) {}

  async getTimeRecordLogs() {
    const timeRecordLogQuery = new TimeRecordLogQuery(this.dataSource);

    return new ListDto(undefined, await timeRecordLogQuery.findTImeRecordList(), TimeRecordLogDto);
  }
}
