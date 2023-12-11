import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { TimeMemoIdProperty, decodeEntityId, encodeEntityId } from '@entity';
import {
  CannotDeleteTimeMemoException,
  CannotUpdateTimeMemoException,
  ListDto,
  NotFoundTimeMemoException,
  TimeMemoQuery,
  TimeLogQuery,
} from '@server/common';

import { TimeMemoDto, TimeMemoListBodyDto, TimeMemoParamDto, TimeMemoUpdateBodyDto } from './dto';

@Injectable()
export class TimeMemoService {
  constructor(private readonly dataSource: DataSource) {}

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

  async updateTimeMemo(userId: number, body: TimeMemoUpdateBodyDto) {
    if (userId !== body.user.id) {
      throw new CannotUpdateTimeMemoException();
    }

    const timeMemoQuery = new TimeMemoQuery(this.dataSource);
    const timeMemoId = encodeEntityId<TimeMemoIdProperty>({
      user: userId,
      date: body.date,
    });

    await timeMemoQuery.upsertTimeMemo(timeMemoId, body);
    const timeMemo = await timeMemoQuery.findTimeMemoById(timeMemoId);

    if (timeMemo == null) {
      throw new NotFoundTimeMemoException();
    }

    const timeLogQuery = new TimeLogQuery(this.dataSource);
    await timeLogQuery.upsertTimeLog(userId);

    return new TimeMemoDto(timeMemo);
  }

  async deleteTimeMemo(userId: number, param: TimeMemoParamDto) {
    const timeMemo = decodeEntityId<TimeMemoIdProperty>(param.id);

    if (userId !== timeMemo.user) {
      throw new CannotDeleteTimeMemoException();
    }

    const timeMemoQuery = new TimeMemoQuery(this.dataSource);
    await timeMemoQuery.deleteTimeMemo(param.id);

    const timeLogQuery = new TimeLogQuery(this.dataSource);
    await timeLogQuery.upsertTimeLog(userId);
  }
}
