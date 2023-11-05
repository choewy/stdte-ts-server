import { DataSource } from 'typeorm';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import {
  AuthStatusValue,
  EmploymentStatusValue,
  Role,
  RolePolicy,
  RolePolicyScopeText,
  RolePolicyScopeValue,
  RoleQuery,
  User,
  UserQuery,
  VersionConfig,
} from '@server/common';

import { BcryptService } from './core';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  public getVersion(): string {
    return new VersionConfig().getVersion();
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultRole();
    await this.createDefaultUser();
  }

  private async createDefaultRole(): Promise<void> {
    const roleQuery = RoleQuery.withDataSource(this.dataSource);

    let role = await roleQuery.findAnyRole();

    if (!role) {
      role = new Role();
      role.rolePolicy = new RolePolicy();
    }

    role.name = RolePolicyScopeText.Admin;
    role.rolePolicy.accessRole = RolePolicyScopeValue.Admin;
    role.rolePolicy.accessTeam = RolePolicyScopeValue.Admin;
    role.rolePolicy.accessUser = RolePolicyScopeValue.Admin;
    role.rolePolicy.accessProject = RolePolicyScopeValue.Admin;

    await roleQuery.createRole(role);
  }

  private async createDefaultUser(): Promise<void> {
    const roleQuery = RoleQuery.withDataSource(this.dataSource);
    const userQuery = UserQuery.withDataSource(this.dataSource);

    let user = await userQuery.findAnyUser();

    if (!user) {
      user = new User();
      user.password = new BcryptService().encryptPassword('master');
    }

    user.name = '관리자';
    user.email = 'master@stdte.co.kr';
    user.authStatus = AuthStatusValue.Active;
    user.employmentStatus = EmploymentStatusValue.Active;
    user.role = await roleQuery.findAnyRole();

    await userQuery.createUser(user);
  }
}
