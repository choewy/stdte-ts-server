import { DataSource, EntityManager } from 'typeorm';
import { hashSync } from 'bcrypt';

import { CredentialStatus, PolicyLevel, Role, RolePolicy, User, UserCredentials } from '@entity';

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
        accessRoleLevel: PolicyLevel.Developer,
        accessTeamLevel: PolicyLevel.Developer,
        accessUserLevel: PolicyLevel.Developer,
        accessProjectLevel: PolicyLevel.Developer,
      }),
      rolePolicyRepository.create({
        id: 2,
        role: { id: 2 },
        accessRoleLevel: PolicyLevel.Admin,
        accessTeamLevel: PolicyLevel.Admin,
        accessUserLevel: PolicyLevel.Admin,
        accessProjectLevel: PolicyLevel.Admin,
      }),
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

    return [
      userCredentialsRepository.create({
        id: 1,
        user: { id: 1 },
        email: 'developer@stdte.co.kr',
        password: hashSync('standard', 10),
        status: CredentialStatus.Active,
      }),
      userCredentialsRepository.create({
        id: 2,
        user: { id: 2 },
        email: 'admin@stdte.co.kr',
        password: hashSync('standard', 10),
        status: CredentialStatus.Active,
      }),
    ];
  }
}
