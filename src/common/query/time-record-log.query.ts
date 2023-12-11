import { DataSource, DeepPartial, EntityManager, In } from 'typeorm';

import { CredentialsStatus, TimeRecordLog, UserStatus } from '@entity';

import { EntityQuery } from '../class';

export class TimeRecordLogQuery extends EntityQuery<TimeRecordLog> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeRecordLog);
  }

  async findTImeRecordList() {
    return this.repository.findAndCount({
      relations: { user: { credentials: true } },
      select: {
        lastUpdatedAt: true,
        user: {
          id: true,
          name: true,
          status: true,
          credentials: { status: true },
        },
      },
      where: {
        user: {
          status: UserStatus.Active,
          credentials: { status: CredentialsStatus.Active },
        },
      },
    });
  }

  async findTimeRecordsInUsers(userIds: number[]) {
    return this.repository.find({
      relations: { user: true },
      select: { user: { id: true } },
      where: { user: { id: In(userIds) } },
    });
  }

  async insertTimeRecordLog(userId: number) {
    return this.repository.insert(this.repository.create({ id: userId, user: { id: userId } }));
  }

  async insertTimeRecordLogs(entities: DeepPartial<TimeRecordLog>[]) {
    return this.repository.insert(this.repository.create(entities));
  }

  async upsertTimeRecordLog(id: number) {
    return this.repository.upsert({ id, lastUpdatedAt: new Date() }, { conflictPaths: { id: true } });
  }
}
