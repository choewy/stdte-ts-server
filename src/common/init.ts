import { Role, User } from './entities';
import { RolePolicyScope, AuthStatus, EmploymentStatus } from './constants';

export class InitEntity {
  public get roles(): Role[] {
    return [
      new Role({
        id: 1,
        name: '개발자',
        rolePolicy: {
          id: 1,
          accessRole: RolePolicyScope.Developer,
          accessTeam: RolePolicyScope.Developer,
          accessUser: RolePolicyScope.Developer,
          accessProject: RolePolicyScope.Developer,
        },
        onInit: true,
      }),
      new Role({
        id: 2,
        name: '관리자',
        rolePolicy: {
          id: 2,
          accessRole: RolePolicyScope.Admin,
          accessTeam: RolePolicyScope.Admin,
          accessUser: RolePolicyScope.Admin,
          accessProject: RolePolicyScope.Admin,
        },
        onInit: true,
      }),
    ];
  }

  public get users(): User[] {
    return [
      new User({
        id: 1,
        email: 'developer@stdte.co.kr',
        password: 'developer6453',
        name: '개발자',
        authStatus: AuthStatus.Active,
        employmentStatus: EmploymentStatus.Active,
        role: new Role({ id: 1 }),
        onInit: true,
      }),
      new User({
        id: 2,
        email: 'admin@stdte.co.kr',
        password: 'admin6453',
        name: '관리자',
        authStatus: AuthStatus.Active,
        employmentStatus: EmploymentStatus.Active,
        role: new Role({ id: 2 }),
        onInit: true,
      }),
    ];
  }
}
