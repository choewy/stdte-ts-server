import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { CredentialsStatus, Credentials, User } from '@entity';

import { EntityQuery } from '../class';

export class CredentialsQuery extends EntityQuery<Credentials> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Credentials);
  }

  async hasCredentialsByEmail(email: string) {
    return this.repository.exist({ where: { email } });
  }

  async hasCredentialsById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findCredentialsByOnInit() {
    return this.repository.find({ where: { onInit: true } });
  }

  async findCredentialsByUserId(userId: number) {
    return this.repository.findOne({ where: { user: { id: userId } } });
  }

  async saveCredentials(user: User, entity: DeepPartial<Credentials>) {
    return this.repository.save(this.repository.create({ ...entity, id: user.id, user }));
  }

  async updateCredentialsStatus(id: number, status: CredentialsStatus) {
    await this.repository.update({ id }, { status });
  }

  async updateCredentialsPassword(userId: number, password: string) {
    await this.repository.update({ user: { id: userId } }, { password });
  }

  async upsertCredentials(entities: DeepPartial<Credentials>[]) {
    await this.repository.upsert(entities, { conflictPaths: { id: true } });
  }
}
