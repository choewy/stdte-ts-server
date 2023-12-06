import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { UserCredentials } from '@entity';

import { EntityQuery } from '../class';

export class UserCredentialsQuery extends EntityQuery<UserCredentials> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, UserCredentials);
  }

  async hasUserCredentialsByEmail(email: string) {
    return this.repository.exist({ where: { email } });
  }

  async hasUserCredentialsById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async findUserCredentialsByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async findUserCredentialsByUserId(userId: number) {
    return this.repository.findOne({ where: { user: { id: userId } } });
  }

  async insertUserCredentials(pick: Pick<UserCredentials, 'user' | 'email' | 'password'>) {
    const credentials = this.repository.create({
      id: pick.user.id,
      user: { id: pick.user.id },
      email: pick.email,
      password: pick.password,
    });

    await this.repository.insert(credentials);

    return credentials;
  }

  async updateUserCredentialsPassword(userId: number, password: string) {
    await this.repository.update({ user: { id: userId } }, { password });
  }

  async insertUserCredentialsWithBulk(deepPartials: DeepPartial<UserCredentials>[]) {
    await this.repository.insert(deepPartials);
  }
}
