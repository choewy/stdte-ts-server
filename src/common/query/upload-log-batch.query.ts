import { DataSource, EntityManager } from 'typeorm';

import { UploadLogBatch } from '@entity';

import { EntityQuery } from '../class';

export class UploadLogBatchQuery extends EntityQuery<UploadLogBatch> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, UploadLogBatch);
  }

  async findLogBatch() {
    return this.repository.findOne({
      where: { id: 1 },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async updateLogBatch(working: boolean) {
    await this.repository.update({ id: 1 }, { working });
  }
}
