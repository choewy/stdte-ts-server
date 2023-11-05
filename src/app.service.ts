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
    const role = await this.createDefaultRole();
    await this.createDefaultUser(role);
  }

  private async createDefaultRole(): Promise<Role> {
    const roleQuery = RoleQuery.withDataSource(this.dataSource);

    let role = await roleQuery.findRoleByInit();

    if (!role) {
      role = new Role();
      role.init = true;
      role.rolePolicy = new RolePolicy();
    }

    let pass = true;

    const name = RolePolicyScopeText.Admin;
    const scope = RolePolicyScopeValue.Admin;

    if (role.name !== name) {
      role.name = name;
      pass = false;
    }

    if (role.rolePolicy.accessRole !== scope) {
      role.rolePolicy.accessRole = scope;
      pass = false;
    }

    if (role.rolePolicy.accessTeam !== scope) {
      role.rolePolicy.accessTeam = scope;
      pass = false;
    }

    if (role.rolePolicy.accessUser !== scope) {
      role.rolePolicy.accessUser = scope;
      pass = false;
    }

    if (role.rolePolicy.accessProject !== scope) {
      role.rolePolicy.accessProject = scope;
      pass = false;
    }

    if (pass) {
      return role;
    }

    return roleQuery.createRole(role);
  }

  private async createDefaultUser(role: Role): Promise<User> {
    const userQuery = UserQuery.withDataSource(this.dataSource);

    let user = await userQuery.findUserByInit();

    if (!user) {
      user = new User();
      user.init = true;
      user.password = new BcryptService().encryptPassword('master');
    }

    let pass = true;

    const name = '관리자';
    const email = 'master@stdte.co.kr';
    const authStatus = AuthStatusValue.Active;
    const employmentStatus = EmploymentStatusValue.Active;

    if (user.name !== name) {
      user.name = name;
      pass = false;
    }

    if (user.email !== email) {
      user.email = email;
      pass = false;
    }

    if (user.authStatus !== authStatus) {
      user.authStatus = authStatus;
      pass = false;
    }

    if (user.employmentStatus !== employmentStatus) {
      user.employmentStatus = employmentStatus;
      pass = false;
    }

    if (user.role?.id !== role.id) {
      user.role = role;
      pass = false;
    }

    if (pass) {
      return user;
    }

    return userQuery.createUser(user);
  }
}
