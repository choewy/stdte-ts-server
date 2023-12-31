import { And, DataSource, DeepPartial, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { TimeMemo } from '@entity';

import { EntityQuery } from '../class';
import { TimeMemoQueryFindsArgs } from './types';

export class TimeMemoQuery extends EntityQuery<TimeMemo> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeMemo);
  }

  async findTimeMemoById(id: number) {
    return this.repository.findOne({
      relations: { user: true },
      select: {
        user: { id: true },
        id: true,
        date: true,
        text: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });
  }

  async findTImeMemoList(args: TimeMemoQueryFindsArgs) {
    return this.repository.findAndCount({
      where: {
        user: { id: args.userId },
        date: And(MoreThanOrEqual(args.s), LessThanOrEqual(args.e)),
      },
    });
  }

  async insertTimeMemo(entity: DeepPartial<TimeMemo>) {
    return this.repository.insert(this.repository.create(entity));
  }

  async upsertTimeMemo(id: number, entity: DeepPartial<TimeMemo>) {
    return this.repository.upsert(this.repository.create({ ...entity, id }), {
      conflictPaths: { id: true },
    });
  }

  async deleteTimeMemo(id: number) {
    return this.repository.delete({ id });
  }
}
