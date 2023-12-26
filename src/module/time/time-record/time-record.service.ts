import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { TimeRecord } from '@entity';
import {
  CannotUpdateTimeRecordException,
  NotFoundTimeRecordException,
  OverTimeRecordSumException,
  TimeLogEvent,
  TimeRecordEvent,
  TimeRecordQuery,
} from '@server/common';

import {
  TimeRecordSumMap,
  TimeRecordListBodyDto,
  TimeRecordUpsertBodyDto,
  TimeRecordListDto,
  TimeRecordRowDto,
} from './dto';

@Injectable()
export class TimeRecordService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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

  async upsertTimeRecord(userId: number, body: TimeRecordUpsertBodyDto) {
    if (userId !== body.user.id) {
      throw new CannotUpdateTimeRecordException();
    }

    const timeRecordQuery = new TimeRecordQuery(this.dataSource);

    if (await timeRecordQuery.hasOverDailyTimeRecords(body.id, body)) {
      throw new OverTimeRecordSumException();
    }

    let id: number;

    if (body.id) {
      const upsert = await timeRecordQuery.upsertTimeRecord(body.id, {
        user: body.user,
        project: body.project,
        taskMainCategory: body.taskMainCategory,
        taskSubCategory: body.taskSubCategory,
        date: body.date,
        time: body.time,
      });

      id = upsert.identifiers[0]?.id;
    } else {
      const insert = await timeRecordQuery.insertTimeRecord({
        user: body.user,
        project: body.project,
        taskMainCategory: body.taskMainCategory,
        taskSubCategory: body.taskSubCategory,
        date: body.date,
        time: body.time,
      });

      id = insert.identifiers[0]?.id;
    }

    if (id == null) {
      throw new NotFoundTimeRecordException();
    }

    const timeRecord = await timeRecordQuery.findTimeRecordById(id);

    if (timeRecord == null) {
      throw new NotFoundTimeRecordException();
    }

    const timeRecordSum = await timeRecordQuery.sumTimeRecordsByDate(userId, body.date);
    const timeRecordRow = new TimeRecordRowDto(timeRecordSum.sum, timeRecord);

    this.eventEmitter.emit(TimeRecordEvent.Upsert, userId, timeRecordRow);
    this.eventEmitter.emit(TimeLogEvent.Update, userId);

    return timeRecordRow;
  }
}
