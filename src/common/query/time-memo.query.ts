import { And, DataSource, DeepPartial, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { TimeMemo } from '@entity';

import { EntityQuery } from '../class';
import { TimeMemoQueryFindsArgs } from './types';

export class TimeMemoQuery extends EntityQuery<TimeMemo> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeMemo);
  }

  async findTimeMemoById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findTImeMemoList(args: TimeMemoQueryFindsArgs) {
    return this.repository.findAndCount({
      where: {
        user: { id: args.userId },
        date: And(MoreThanOrEqual(args.s), LessThanOrEqual(args.e)),
      },
    });
  }

  async upsertTimeMemo(id: string, entity: DeepPartial<TimeMemo>) {
    return this.repository.upsert(this.repository.create({ ...entity, id }), {
      conflictPaths: { id: true },
    });
  }

  async deleteTimeMemo(id: string) {
    return this.repository.delete({ id });
  }
}
