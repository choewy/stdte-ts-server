import { DataSource, EntityManager } from 'typeorm';

import { UploadLogBatch } from '@entity';

import { EntityQuery } from '../class';

export class UploadLogBatchQuery extends EntityQuery<UploadLogBatch> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, UploadLogBatch);
  }

  async findLogBatch() {
    await this.repository.upsert({ id: 1 }, { conflictPaths: { id: true } });

    const rows = await this.repository.find({
      where: { id: 1 },
      lock: { mode: 'pessimistic_write' },
    });

    return rows[0];
  }

  async updateLogBatch(working: boolean) {
    await this.repository.update({ id: 1 }, { working });
  }
}
