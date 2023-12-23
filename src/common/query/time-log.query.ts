import { DataSource, EntityManager } from 'typeorm';

import { CredentialsStatus, TimeLog, UserStatus } from '@entity';

import { EntityQuery } from '../class';

export class TimeLogQuery extends EntityQuery<TimeLog> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeLog);
  }

  async findTimeLogById(id: number) {
    return this.repository.findOne({
      relations: { user: true },
      select: {
        id: true,
        user: { id: true, name: true },
        lastUpdatedAt: true,
      },
      where: { id },
    });
  }

  async findTimeLogList() {
    return this.repository.findAndCount({
      relations: { user: { credentials: true } },
      select: {
        lastUpdatedAt: true,
        user: {
          id: true,
          name: true,
          onInit: true,
          status: true,
          credentials: { status: true },
        },
      },
      where: {
        user: {
          onInit: false,
          status: UserStatus.Active,
          credentials: { status: CredentialsStatus.Active },
        },
      },
      order: { id: 'ASC' },
    });
  }

  async insertTimeLog(userId: number) {
    return this.repository.insert(this.repository.create({ id: userId, user: { id: userId } }));
  }

  async upsertTimeLog(id: number) {
    return this.repository.upsert({ id, user: { id }, lastUpdatedAt: new Date() }, { conflictPaths: { id: true } });
  }
}
