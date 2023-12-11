import { DateTime } from 'luxon';
import { And, DataSource, DeepPartial, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { TimeRecord } from '@entity';

import { EntityQuery } from '../class';
import { TimeRecordQueryFindsArgs } from './types';
import { DateTimeFormat } from '../enums';

export class TimeRecordQuery extends EntityQuery<TimeRecord> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeRecord);
  }

  private createId(
    entity: DeepPartial<Pick<TimeRecord, 'user' | 'project' | 'taskMainCategory' | 'taskSubCategory' | 'date'>>,
  ) {
    let datetime: DateTime;

    if (entity.date instanceof Date) {
      datetime = DateTime.fromJSDate(entity.date);
    } else if (typeof entity.date === 'string') {
      datetime = DateTime.fromJSDate(new Date(entity.date));
    } else {
      datetime = DateTime.local();
    }

    let date: string;

    if (datetime.isValid) {
      date = datetime.toFormat(DateTimeFormat.YYYYMMDD) as string;
    } else {
      date = [DateTime.local().toFormat(DateTimeFormat.YYYYMMDD), 'invalid'].join('_');
    }

    return [date, entity.user?.id, entity.project?.id, entity.taskMainCategory?.id, entity.taskSubCategory?.id].join(
      '-',
    );
  }

  async findTimeRecordById(id: string) {
    return this.repository.findOne({
      relations: {
        user: true,
        project: true,
        taskMainCategory: true,
        taskSubCategory: true,
      },
      select: {
        id: true,
        date: true,
        time: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true },
        project: { id: true },
        taskMainCategory: { id: true },
        taskSubCategory: { id: true },
      },
      where: { id },
    });
  }

  async findTimeRecords(args: TimeRecordQueryFindsArgs) {
    return this.repository.find({
      relations: {
        user: true,
        project: true,
        taskMainCategory: true,
        taskSubCategory: true,
      },
      select: {
        id: true,
        date: true,
        time: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true },
        project: { id: true },
        taskMainCategory: { id: true },
        taskSubCategory: { id: true },
      },
      where: {
        user: { id: args.userId },
        date: And(MoreThanOrEqual(args.s), LessThanOrEqual(args.e)),
      },
    });
  }

  async upsertTimeRecord(entity: DeepPartial<TimeRecord>) {
    return this.repository.upsert({ ...entity, id: this.createId(entity) }, { conflictPaths: { id: true } });
  }

  async deleteTimeRecord(id: string) {
    return this.repository.delete({ id });
  }
}
