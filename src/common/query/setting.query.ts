import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { Setting } from '@entity';

import { EntityQuery } from '../class';

export class SettingQuery extends EntityQuery<Setting> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Setting);
  }

  async findSetting() {
    return this.repository.findOne({ where: { id: 1 } });
  }

  async upsertSetting(entity: DeepPartial<Setting>) {
    return this.repository.upsert(entity, { conflictPaths: { id: true } });
  }
}
