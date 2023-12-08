import { DataSource, EntityManager } from 'typeorm';
import { hashSync } from 'bcrypt';

import { CredentialsStatus, PolicyLevel, Role, RolePolicy, User, UserCredentials } from '@entity';
import { PolicyLevelMap } from '@server/common';
import { CredentialsConfig } from '@server/config';

export class InitMap {
  constructor(private readonly connection: DataSource | EntityManager) {}

  get roles() {
    const roleRepository = this.connection.getRepository(Role);

    return [
      roleRepository.create({ id: 1, name: '개발자', onInit: true }),
      roleRepository.create({ id: 2, name: '관리자', onInit: true }),
    ];
  }

  get rolePolicies() {
    const rolePolicyRepository = this.connection.getRepository(RolePolicy);

    return [
      rolePolicyRepository.create({
        id: 1,
        role: { id: 1 },
        accessCredentials: PolicyLevel.Developer,
        accessRole: PolicyLevel.Developer,
        accessUser: PolicyLevel.Developer,
        accessProject: PolicyLevel.Developer,
      } as PolicyLevelMap),
      rolePolicyRepository.create({
        id: 2,
        role: { id: 2 },
        accessCredentials: PolicyLevel.Admin,
        accessRole: PolicyLevel.Admin,
        accessUser: PolicyLevel.Admin,
        accessProject: PolicyLevel.Admin,
      } as PolicyLevelMap),
    ];
  }

  get users() {
    const userRepository = this.connection.getRepository(User);

    return [
      userRepository.create({ id: 1, role: { id: 1 }, name: '개발자', onInit: true }),
      userRepository.create({ id: 2, role: { id: 2 }, name: '관리자', onInit: true }),
    ];
  }

  get userCredentials() {
    const userCredentialsRepository = this.connection.getRepository(UserCredentials);

    const credentialsConfig = new CredentialsConfig();
    const developerCredentials = credentialsConfig.getDeveloperCredentials();
    const adminCredentials = credentialsConfig.getAdminCredentials();

    return [
      userCredentialsRepository.create({
        id: 1,
        user: { id: 1 },
        email: developerCredentials.email,
        password: hashSync(developerCredentials.password, 10),
        status: CredentialsStatus.Active,
      }),
      userCredentialsRepository.create({
        id: 2,
        user: { id: 2 },
        email: adminCredentials.email,
        password: hashSync(adminCredentials.password, 10),
        status: CredentialsStatus.Active,
      }),
    ];
  }
}
