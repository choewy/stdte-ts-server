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

  async updateSetting(entity: DeepPartial<Setting>) {
    await this.repository.update({ id: 1 }, entity);
  }

  async upsertSetting(entity: DeepPartial<Setting>) {
    await this.repository.upsert(entity, { conflictPaths: { id: true } });
  }
}
