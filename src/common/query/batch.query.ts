import { DataSource, EntityManager } from 'typeorm';

import { Batch, BatchKey } from '@entity';

import { EntityQuery } from '../class';

export class BatchQuery extends EntityQuery<Batch> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Batch);
  }

  async findLogBatch() {
    return this.repository.findOne({
      where: { key: BatchKey.LogUpload },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async findBatchByKeyWithLock(key: BatchKey) {
    return this.repository.findOne({
      where: { key },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async updateBatchWorkingByKey(key: BatchKey, working: boolean) {
    await this.repository.update({ key }, { working });
  }
}
