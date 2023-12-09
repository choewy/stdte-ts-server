import { hashSync } from 'bcrypt';
import { DataSource, EntityManager } from 'typeorm';

import {
  CredentialsStatus,
  Role,
  RolePolicy,
  RolePolicyProperty,
  User,
  Credentials,
  RolePolicyLevel,
  UploadLogBatch,
  Setting,
} from '@entity';
import { CredentialsConfig } from '@server/config';

export class InitializeMap {
  constructor(private readonly connection: DataSource | EntityManager) {}

  get setting() {
    const repository = this.connection.getRepository(Setting);

    return repository.create({ id: 1, difficultyTooltip: '' });
  }

  get uploadLogBatch() {
    const repository = this.connection.getRepository(UploadLogBatch);

    return repository.create({ id: 1, working: false });
  }

  get roles() {
    const repository = this.connection.getRepository(Role);

    return [
      repository.create({ id: 1, onInit: true, name: '개발자' }),
      repository.create({ id: 2, onInit: true, name: '관리자' }),
    ];
  }

  get rolePolicies() {
    const repository = this.connection.getRepository(RolePolicy);

    return [
      repository.create({
        id: 1,
        role: { id: 1 },
        onInit: true,
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
      repository.create({
        id: 2,
        role: { id: 2 },
        onInit: true,
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
    const repository = this.connection.getRepository(User);

    return [
      repository.create({ id: 1, onInit: true, role: { id: 1 }, name: '개발자' }),
      repository.create({ id: 2, onInit: true, role: { id: 2 }, name: '관리자' }),
    ];
  }

  get credentials() {
    const repository = this.connection.getRepository(Credentials);

    const credentialsConfig = new CredentialsConfig();
    const developer = credentialsConfig.getDeveloperCredentials();
    const admin = credentialsConfig.getAdminCredentials();

    return [
      repository.create({
        id: 1,
        user: { id: 1 },
        onInit: true,
        email: developer.email,
        password: hashSync(developer.password, 10),
        status: CredentialsStatus.Active,
      }),
      repository.create({
        id: 2,
        user: { id: 2 },
        onInit: true,
        email: admin.email,
        password: hashSync(admin.password, 10),
        status: CredentialsStatus.Active,
      }),
    ];
  }
}
