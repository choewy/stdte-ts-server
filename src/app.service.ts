import { DataSource } from 'typeorm';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import {
  AuthStatusValue,
  EmploymentStatusValue,
  InjectReaderDataSource,
  InjectWriterDataSource,
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
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  public getVersion(): string {
    return new VersionConfig().getVersion();
  }

  async onApplicationBootstrap(): Promise<void> {
    const role = await this.createDefaultRole();
    await this.createDefaultUser(role);
  }

  private async createDefaultRole(): Promise<Role> {
    let role = await RoleQuery.of(this.readerDataSource).findRoleByOnInit();

    if (!role) {
      role = new Role();
      role.rolePolicy = new RolePolicy();
    }

    let pass = true;

    const name = RolePolicyScopeText.Admin;
    const scope = RolePolicyScopeValue.Admin;

    if (role.onInit !== true) {
      role.onInit = true;
      pass = false;
    }

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

    return RoleQuery.of(this.writerDataSource).createRole(role);
  }

  private async createDefaultUser(role: Role): Promise<User> {
    let user = await UserQuery.of(this.readerDataSource).findUserByOnInit();

    if (!user) {
      user = new User();
      user.password = new BcryptService().encryptPassword('master');
    }

    let pass = true;

    const name = '관리자';
    const email = 'master@stdte.co.kr';
    const authStatus = AuthStatusValue.Active;
    const employmentStatus = EmploymentStatusValue.Active;

    if (user.onInit !== true) {
      user.onInit = true;
      pass = false;
    }

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

    return UserQuery.of(this.writerDataSource).createUser(user);
  }
}
