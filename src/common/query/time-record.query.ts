import { And, DataSource, DeepPartial, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { TimeRecord } from '@entity';

import { EntityQuery } from '../class';
import { TimeRecordQueryFindsArgs, TimeRecordQueryHasOverTimeArgs } from './types';

export class TimeRecordQuery extends EntityQuery<TimeRecord> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeRecord);
  }

  /** @todo 프로젝트 노출 상태 체크 필요 */
  async sumTimeRecordsByDate(userId: number, date: string) {
    const result = await this.repository
      .createQueryBuilder('timeRecord')
      .select('SUM(timeRecord.time)', 'sum')
      .innerJoin('timeRecord.project', 'project')
      .where('timeRecord.date = :date', { date })
      .andWhere('timeRecord.userId = :userId', { userId })
      .getRawOne<{ sum: string }>();

    return result ?? { sum: '0' };
  }

  /** @description 프로젝트 상태 체크 하지 않음 */
  async hasOverDailyTimeRecords(id: string, args: TimeRecordQueryHasOverTimeArgs) {
    const result = await this.repository
      .createQueryBuilder('timeRecord')
      .select('SUM(timeRecord.time)', 'sum')
      .where('timeRecord.id != :id', { id })
      .andWhere('timeRecord.userId = :userId', { userId: args.user.id })
      .andWhere('timeRecord.date = :date', { date: args.date })
      .getRawOne<{ sum: string }>();

    return Number(result?.sum ?? '0') + Number(args.time) > 24;
  }

  /** @description 프로젝트 상태 체크 필요 */
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
      where: { id, project: {} },
    });
  }

  /** @description 프로젝트 상태 체크 필요 */
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
        project: {},
        date: And(MoreThanOrEqual(args.s), LessThanOrEqual(args.e)),
      },
    });
  }

  async upsertTimeRecord(id: string, entity: DeepPartial<TimeRecord>) {
    return this.repository.upsert({ ...entity, id }, { conflictPaths: { id: true } });
  }

  async deleteTimeRecord(id: string) {
    return this.repository.delete({ id });
  }
}
