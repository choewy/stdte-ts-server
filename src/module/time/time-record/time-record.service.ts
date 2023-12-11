import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { TimeRecord, TimeRecordIdProperty, decodeEntityId, encodeEntityId } from '@entity';
import {
  CannotDeleteTimeRecordException,
  CannotUpdateTimeRecordException,
  NotFoundTimeRecordException,
  OverTimeRecordSumException,
  TimeRecordQuery,
} from '@server/common';

import {
  TimeRecordSumMap,
  TimeRecordListBodyDto,
  TimeRecordParamDto,
  TimeRecordUpdateBodyDto,
  TimeRecordListDto,
  TimeRecordRowDto,
} from './dto';

@Injectable()
export class TimeRecordService {
  constructor(private readonly dataSource: DataSource) {}

  private getTimeRecordsTimeTotal(s: string, e: string, timeRecords: TimeRecord[]) {
    const total: TimeRecordSumMap = {};
    const start = DateTime.fromJSDate(new Date(s));
    const end = DateTime.fromJSDate(new Date(e));
    const days = Math.ceil(end.diff(start, 'days').get('days'));

    for (let day = 0; day <= days; day++) {
      let times = 0;

      const date = start.plus({ day }).toSQLDate() as string;

      for (const record of timeRecords.filter((timeRecord) => timeRecord.date === date)) {
        times += Number(record.time);
      }

      total[date] = times.toFixed(2);
    }

    return total;
  }

  async getTimeRecords(body: TimeRecordListBodyDto) {
    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const timeRecords = await timeRecordQuery.findTimeRecords({
      userId: body.user.id,
      s: body.s,
      e: body.e,
    });

    return new TimeRecordListDto(this.getTimeRecordsTimeTotal(body.s, body.e, timeRecords), timeRecords);
  }

  async updateTimeRecord(userId: number, body: TimeRecordUpdateBodyDto) {
    if (userId !== body.user.id) {
      throw new CannotUpdateTimeRecordException();
    }

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    const timeRecordId = encodeEntityId<TimeRecordIdProperty>({
      date: body.date,
      user: body.user.id,
      project: body.project.id,
      main: body.taskMainCategory.id,
      sub: body.taskMainCategory.id,
    });

    if (await timeRecordQuery.hasOverDailyTimeRecords(timeRecordId, body)) {
      throw new OverTimeRecordSumException();
    }

    await timeRecordQuery.upsertTimeRecord(timeRecordId, body);
    const timeRecord = await timeRecordQuery.findTimeRecordById(timeRecordId);

    if (timeRecord == null) {
      throw new NotFoundTimeRecordException();
    }

    const timeRecordSum = await timeRecordQuery.sumTimeRecordsByDate(body.user.id, body.date);
    return new TimeRecordRowDto(timeRecordSum.sum, timeRecord);
  }

  async deleteTimeRecord(userId: number, param: TimeRecordParamDto) {
    const timeRecord = decodeEntityId<TimeRecordIdProperty>(param.id);

    if (userId !== timeRecord.user) {
      throw new CannotDeleteTimeRecordException();
    }

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);
    await timeRecordQuery.deleteTimeRecord(param.id);
  }
}
