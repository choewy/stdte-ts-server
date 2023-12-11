import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ListDto, TimeLogQuery } from '@server/common';

import { TimeLogDto } from './dto';

@Injectable()
export class TimeLogService {
  constructor(private readonly dataSource: DataSource) {}

  async getTimeLogs() {
    const timeLogQuery = new TimeLogQuery(this.dataSource);

    return new ListDto(undefined, await timeLogQuery.findTimeLogList(), TimeLogDto);
  }
}
