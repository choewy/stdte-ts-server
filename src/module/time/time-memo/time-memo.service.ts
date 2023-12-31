import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  CannotDeleteTimeMemoException,
  CannotUpdateTimeMemoException,
  ListDto,
  NotFoundTimeMemoException,
  TimeMemoQuery,
  TimeLogEvent,
  TimeMemoEvent,
} from '@server/common';

import { TimeMemoDto, TimeMemoListBodyDto, TimeMemoParamDto, TimeMemoUpsertBodyDto } from './dto';

@Injectable()
export class TimeMemoService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getTimeMemos(body: TimeMemoListBodyDto) {
    const timeMemoQuery = new TimeMemoQuery(this.dataSource);

    return new ListDto(
      undefined,
      await timeMemoQuery.findTImeMemoList({
        userId: body.user.id,
        s: body.s,
        e: body.e,
      }),
      TimeMemoDto,
    );
  }

  async upsertTimeMemo(userId: number, body: TimeMemoUpsertBodyDto) {
    if (userId !== body.user.id) {
      throw new CannotUpdateTimeMemoException();
    }

    const timeMemoQuery = new TimeMemoQuery(this.dataSource);

    let id: number;

    if (body.id) {
      const upsert = await timeMemoQuery.upsertTimeMemo(body.id, {
        user: body.user,
        date: body.date,
        text: body.text,
      });

      id = upsert.identifiers[0]?.id;
    } else {
      const insert = await timeMemoQuery.insertTimeMemo({
        user: body.user,
        date: body.date,
        text: body.text,
      });

      id = insert.identifiers[0]?.id;
    }

    if (id == null) {
      throw new NotFoundTimeMemoException();
    }

    const timeMemo = await timeMemoQuery.findTimeMemoById(id);

    if (timeMemo == null) {
      throw new NotFoundTimeMemoException();
    }

    this.eventEmitter.emit(TimeMemoEvent.Upsert, userId, new TimeMemoDto(timeMemo));
    this.eventEmitter.emit(TimeLogEvent.Update, userId);
  }

  async deleteTimeMemo(userId: number, param: TimeMemoParamDto) {
    const timeMemoQuery = new TimeMemoQuery(this.dataSource);
    const timeMemo = await timeMemoQuery.findTimeMemoById(param.id);

    if (timeMemo == null) {
      throw new NotFoundTimeMemoException();
    }

    if (timeMemo.user.id !== userId) {
      throw new CannotDeleteTimeMemoException();
    }

    await timeMemoQuery.deleteTimeMemo(param.id);

    this.eventEmitter.emit(TimeMemoEvent.Delete, userId, param.id);
    this.eventEmitter.emit(TimeLogEvent.Update, userId);
  }
}
