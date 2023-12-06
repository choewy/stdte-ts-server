import { DataSource, EntityManager } from 'typeorm';

import { UserCredentials } from '@entity';

import { EntityQuery } from '../class';

export class UserCredentialsQuery extends EntityQuery<UserCredentials> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, UserCredentials);
  }

  async hasUserCredentialsByEmail(email: string) {
    return this.repository.exist({ where: { email } });
  }

  async findUserCredentialsByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async findUserCredentialsByUserId(userId: number) {
    return this.repository.findOne({ where: { user: { id: userId } } });
  }

  async insertUserCredentials(deepPartial: Pick<UserCredentials, 'user' | 'email' | 'password'>) {
    const credentials = this.repository.create({
      id: deepPartial.user.id,
      user: { id: deepPartial.user.id },
      email: deepPartial.email,
      password: deepPartial.password,
    });

    await this.repository.insert(credentials);

    return credentials;
  }

  async updateUserCredentialsPassword(userId: number, password: string) {
    await this.repository.update({ user: { id: userId } }, { password });
  }
}
