import { And, DataSource, DeepPartial, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { TimeRecord } from '@entity';

import { EntityQuery } from '../class';
import {
  DateRangeArgs,
  TimeRecordAnalysisRaw,
  TimeRecordQueryFindsArgs,
  TimeRecordQueryHasOverTimeArgs,
} from './types';

export class TimeRecordQuery extends EntityQuery<TimeRecord> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeRecord);
  }

  async sumTimeRecordsByDate(userId: number, date: string) {
    const result = await this.repository
      .createQueryBuilder('timeRecord')
      .select('SUM(timeRecord.time)', 'sum')
      .innerJoin('timeRecord.project', 'project', 'project.canExpose = :canExpose', { canExpose: true })
      .where('timeRecord.date = :date', { date })
      .andWhere('timeRecord.userId = :userId', { userId })
      .getRawOne<{ sum: string }>();

    return result ?? { sum: '0' };
  }

  async hasOverDailyTimeRecords(id: number | null, args: TimeRecordQueryHasOverTimeArgs) {
    const queryBuilder = this.repository
      .createQueryBuilder('timeRecord')
      .select('SUM(timeRecord.time)', 'sum')
      .where('timeRecord.userId = :userId', { userId: args.user.id })
      .andWhere('timeRecord.date = :date', { date: args.date });

    if (typeof id === 'number') {
      queryBuilder.andWhere('timeRecord.id != :id', { id });
    }

    const result = await queryBuilder.getRawOne<{ sum: string }>();

    return Number(result?.sum ?? '0') + Number(args.time) > 24;
  }

  async findTimeRecordAnalysis(projects: number[], users: number[], args: DateRangeArgs) {
    return this.repository
      .createQueryBuilder('timeRecord')
      .innerJoin('timeRecord.project', 'project', 'project.id IN(:projects)', { projects })
      .innerJoin('timeRecord.user', 'user', 'user.id IN(:users)', { users })
      .select('DATE_FORMAT(timeRecord.date, "%Y")', 'year')
      .addSelect('SUM(timeRecord.time)', 'time')
      .addSelect('project.id', 'pid')
      .addSelect('user.id', 'uid')
      .where('timeRecord.date >= :s', { s: args.s })
      .andWhere('timeRecord.date <= :e', { e: args.e })
      .groupBy('pid')
      .addGroupBy('uid')
      .addGroupBy('year')
      .getRawMany<TimeRecordAnalysisRaw>();
  }

  async findTimeRecordById(id: number) {
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
      where: { id, project: { canExpose: true } },
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
        project: { canExpose: true },
        date: And(MoreThanOrEqual(args.s), LessThanOrEqual(args.e)),
      },
    });
  }

  async insertTimeRecord(entity: DeepPartial<TimeRecord>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async upsertTimeRecord(id: number, entity: DeepPartial<TimeRecord>) {
    return this.repository.upsert({ ...entity, id }, { conflictPaths: { id: true } });
  }

  async deleteTimeRecord(id: number) {
    return this.repository.delete({ id });
  }
}
