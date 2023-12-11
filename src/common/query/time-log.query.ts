import { DataSource, DeepPartial, EntityManager, In } from 'typeorm';

import { CredentialsStatus, TimeLog, UserStatus } from '@entity';

import { EntityQuery } from '../class';

export class TimeLogQuery extends EntityQuery<TimeLog> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeLog);
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
    });
  }

  async findTimeLogsInUsers(userIds: number[]) {
    return this.repository.find({
      relations: { user: true },
      select: { user: { id: true } },
      where: { user: { id: In(userIds) } },
    });
  }

  async insertTimeLog(userId: number) {
    return this.repository.insert(this.repository.create({ id: userId, user: { id: userId } }));
  }

  async insertTimeLogs(entities: DeepPartial<TimeLog>[]) {
    return this.repository.insert(this.repository.create(entities));
  }

  async upsertTimeLog(id: number) {
    return this.repository.upsert({ id, lastUpdatedAt: new Date() }, { conflictPaths: { id: true } });
  }
}
