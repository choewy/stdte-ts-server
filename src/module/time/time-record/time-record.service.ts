import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  CannotUpdateTimeRecordException,
  InsertDto,
  NotFoundTimeRecordException,
  TimeRecordQuery,
} from '@server/common';

import { TimeRecordDto, TimeRecordListBodyDto, TimeRecordParamDto, TimeRecordUpdateBodyDto } from './dto';

@Injectable()
export class TimeRecordService {
  constructor(private readonly dataSource: DataSource) {}

  async getTimeRecords(body: TimeRecordListBodyDto) {
    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const timeRecords = await timeRecordQuery.findTimeRecords(body);

    return timeRecords.map((timeRecord) => new TimeRecordDto(timeRecord));
  }

  async updateTimeRecord(userId: number, body: TimeRecordUpdateBodyDto) {
    if (userId !== body.user.id) {
      throw new CannotUpdateTimeRecordException();
    }

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const upsert = new InsertDto<string>(await timeRecordQuery.upsertTimeRecord(body));

    if (upsert.id == null) {
      throw new NotFoundTimeRecordException();
    }

    const timeRecord = await timeRecordQuery.findTimeRecordById(upsert.id);

    if (timeRecord == null) {
      throw new NotFoundTimeRecordException();
    }

    return new TimeRecordDto(timeRecord);
  }

  async deleteTimeRecord(param: TimeRecordParamDto) {
    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    await timeRecordQuery.deleteTimeRecord(param.id);
  }
}
