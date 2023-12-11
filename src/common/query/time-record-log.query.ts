import { DataSource, DeepPartial, EntityManager, In } from 'typeorm';

import { CredentialsStatus, TimeRecordLog, UserStatus } from '@entity';

import { EntityQuery } from '../class';

export class TimeRecordLogQuery extends EntityQuery<TimeRecordLog> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, TimeRecordLog);
  }

  async findTImeRecords() {
    return this.repository.find({
      relations: { user: { credentials: true } },
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
      where: { user: { id: In(userIds) } },
    });
  }

  async insertTimeRecordLog(userId: number) {
    return this.repository.insert(this.repository.create({ user: { id: userId } }));
  }

  async insertTimeRecordLogs(entities: DeepPartial<TimeRecordLog>[]) {
    return this.repository.insert(this.repository.create(entities));
  }
}
