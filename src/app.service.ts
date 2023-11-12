import { DataSource } from 'typeorm';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import {
  InitEntity,
  InjectReaderDataSource,
  InjectWriterDataSource,
  Role,
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
    const initEntity = new InitEntity();

    await this.createDefaultRole(initEntity.roles);
    await this.createDefaultUser(initEntity.users);
  }

  private async createDefaultRole(rows: Role[]): Promise<void> {
    const roles = await RoleQuery.of(this.readerDataSource).findRolesByOnInit();

    const entities: Role[] = [];

    for (const row of rows) {
      const role = roles.find(({ id }) => id === row.id);

      if (!role) {
        entities.push(row);
        continue;
      }

      if (role.name !== row.name) {
        entities.push(row);
        continue;
      }

      if (role.rolePolicy?.accessRole !== row.rolePolicy.accessRole) {
        entities.push(row);
        continue;
      }

      if (role.rolePolicy?.accessTeam !== row.rolePolicy.accessTeam) {
        entities.push(row);
        continue;
      }

      if (role.rolePolicy?.accessUser !== row.rolePolicy.accessUser) {
        entities.push(row);
        continue;
      }

      if (role.rolePolicy?.accessProject !== row.rolePolicy.accessProject) {
        entities.push(row);
        continue;
      }
    }

    if (entities.length === 0) {
      return;
    }

    await RoleQuery.of(this.writerDataSource).saveRoles(entities);
  }

  private async createDefaultUser(rows: User[]): Promise<void> {
    const bcryptService = new BcryptService();

    const users = await UserQuery.of(this.readerDataSource).findUsersByOnInit();

    const entities: User[] = [];

    for (const row of rows) {
      const user = users.find(({ id }) => id === row.id);

      if (!user) {
        row.password = bcryptService.encryptPassword(row.password);
        entities.push(row);
        continue;
      }

      if (user.name !== row.name) {
        entities.push(row);
        continue;
      }

      if (user.email !== row.email) {
        entities.push(row);
        continue;
      }

      if (user.authStatus !== row.authStatus) {
        entities.push(row);
        continue;
      }

      if (user.employmentStatus !== row.employmentStatus) {
        entities.push(row);
        continue;
      }

      if (user.role?.id !== row.role.id) {
        entities.push(row);
        continue;
      }
    }

    if (entities.length === 0) {
      return;
    }

    await UserQuery.of(this.writerDataSource).saveUsers(entities);
  }
}
