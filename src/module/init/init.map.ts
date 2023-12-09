import { DataSource, EntityManager } from 'typeorm';
import { hashSync } from 'bcrypt';

import { CredentialsStatus, Role, RolePolicy, RolePolicyProperty, User, Credentials, RolePolicyLevel } from '@entity';
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
        roleAndPolicy: RolePolicyLevel.Developer,
        credentials: RolePolicyLevel.Developer,
        setting: RolePolicyLevel.Developer,
        customer: RolePolicyLevel.Developer,
        user: RolePolicyLevel.Developer,
        taskCategory: RolePolicyLevel.Developer,
        industryCategory: RolePolicyLevel.Developer,
        businessCategory: RolePolicyLevel.Developer,
        project: RolePolicyLevel.Developer,
      } as RolePolicyProperty),
      rolePolicyRepository.create({
        id: 2,
        role: { id: 2 },
        roleAndPolicy: RolePolicyLevel.Admin,
        credentials: RolePolicyLevel.Admin,
        setting: RolePolicyLevel.Admin,
        customer: RolePolicyLevel.Admin,
        user: RolePolicyLevel.Admin,
        taskCategory: RolePolicyLevel.Admin,
        industryCategory: RolePolicyLevel.Admin,
        businessCategory: RolePolicyLevel.Admin,
        project: RolePolicyLevel.Admin,
      } as RolePolicyProperty),
    ];
  }

  get users() {
    const userRepository = this.connection.getRepository(User);

    return [
      userRepository.create({ id: 1, role: { id: 1 }, name: '개발자', onInit: true }),
      userRepository.create({ id: 2, role: { id: 2 }, name: '관리자', onInit: true }),
    ];
  }

  get credentials() {
    const credentialsRepository = this.connection.getRepository(Credentials);

    const credentialsConfig = new CredentialsConfig();
    const developerCredentials = credentialsConfig.getDeveloperCredentials();
    const adminCredentials = credentialsConfig.getAdminCredentials();

    return [
      credentialsRepository.create({
        id: 1,
        user: { id: 1 },
        email: developerCredentials.email,
        password: hashSync(developerCredentials.password, 10),
        status: CredentialsStatus.Active,
      }),
      credentialsRepository.create({
        id: 2,
        user: { id: 2 },
        email: adminCredentials.email,
        password: hashSync(adminCredentials.password, 10),
        status: CredentialsStatus.Active,
      }),
    ];
  }
}
