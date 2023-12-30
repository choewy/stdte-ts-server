import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { CredentialsStatus, Credentials, User } from '@entity';

import { EntityQuery } from '../class';
import { CredentialsQueryFindListArgs } from './types';

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

  async findCredentialsByUserId(userId: number) {
    return this.repository.findOne({ where: { user: { id: userId } } });
  }

  async findCredentialsStats() {
    const results = await this.repository
      .createQueryBuilder('credentials')
      .select('credentials.status', 'status')
      .addSelect('COUNT(credentials.id)', 'count')
      .where('credentials.onInit = :onInit', { onInit: false })
      .groupBy('credentials.status')
      .getRawMany<{ status: CredentialsStatus; count: string }>();

    return results;
  }

  async findCredentialsList(args: CredentialsQueryFindListArgs) {
    return this.repository.findAndCount({
      relations: { user: true },
      select: {
        id: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: { name: true },
      },
      where: { status: args.status, onInit: false },
      order: { id: 'ASC' },
      skip: args.skip,
      take: args.take,
    });
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
}
