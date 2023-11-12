import { Role, User } from './entities';
import { ROLE_POLICY_SCOPE_TEXTS, RolePolicyScope, AuthStatus, EmploymentStatus } from './constants';

export class InitEntity {
  public get roles(): Role[] {
    return [
      new Role({
        id: 1,
        name: ROLE_POLICY_SCOPE_TEXTS[RolePolicyScope.Admin],
        rolePolicy: {
          id: 1,
          accessRole: RolePolicyScope.Admin,
          accessTeam: RolePolicyScope.Admin,
          accessUser: RolePolicyScope.Admin,
          accessProject: RolePolicyScope.Admin,
        },
        onInit: true,
      }),
      new Role({
        id: 2,
        name: ROLE_POLICY_SCOPE_TEXTS[RolePolicyScope.Developer],
        rolePolicy: {
          id: 2,
          accessRole: RolePolicyScope.Developer,
          accessTeam: RolePolicyScope.Developer,
          accessUser: RolePolicyScope.Developer,
          accessProject: RolePolicyScope.Developer,
        },
        onInit: true,
      }),
    ];
  }

  public get users(): User[] {
    return [
      new User({
        id: 1,
        email: 'admin@stdte.co.kr',
        password: 'admin6453',
        name: '관리자',
        authStatus: AuthStatus.Active,
        employmentStatus: EmploymentStatus.Active,
        role: new Role({ id: 1 }),
        onInit: true,
      }),
      new User({
        id: 2,
        email: 'developer@stdte.co.kr',
        password: 'developer6453',
        name: '개발자',
        authStatus: AuthStatus.Active,
        employmentStatus: EmploymentStatus.Active,
        role: new Role({ id: 2 }),
        onInit: true,
      }),
    ];
  }
}
