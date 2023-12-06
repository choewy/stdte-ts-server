import { DataSource, EntityManager } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Role, RolePolicy, User, UserCredentials } from '@entity';
import { RolePolicyQuery, RoleQuery, UserCredentialsQuery, UserQuery } from '@server/common';

import { InitMap } from './init.map';

@Injectable()
export class InitService {
  async initRoles(connection: DataSource | EntityManager) {
    const initMap = new InitMap(connection);
    const roleQuery = new RoleQuery(connection);

    const insertRows: Role[] = [];

    for (const role of initMap.roles) {
      if (await roleQuery.hasRoleByIdAndOnInit(role.id)) {
        continue;
      }

      insertRows.push(role);
    }

    if (insertRows.length === 0) {
      return;
    }

    await roleQuery.insertRolesWithBulk(insertRows);
  }

  async initRolePolicies(connection: DataSource | EntityManager) {
    const initMap = new InitMap(connection);
    const rolePolicyQuery = new RolePolicyQuery(connection);

    const insertRows: RolePolicy[] = [];

    for (const rolePolicy of initMap.rolePolicies) {
      if (await rolePolicyQuery.hasRolePolicyById(rolePolicy.id)) {
        continue;
      }

      insertRows.push(rolePolicy);
    }

    if (insertRows.length === 0) {
      return;
    }

    await rolePolicyQuery.insertRolePoliciesWithBulk(insertRows);
  }

  async initUsers(connection: DataSource | EntityManager) {
    const initMap = new InitMap(connection);
    const userQuery = new UserQuery(connection);

    const insertRows: User[] = [];

    for (const user of initMap.users) {
      if (await userQuery.hasUserByIdAndOnInit(user.id)) {
        continue;
      }

      insertRows.push(user);
    }

    if (insertRows.length === 0) {
      return;
    }

    await userQuery.insertUsersWithBulk(insertRows);
  }

  async initUserCredentials(connection: DataSource | EntityManager) {
    const initMap = new InitMap(connection);
    const userCredentialsQuery = new UserCredentialsQuery(connection);

    const insertRows: UserCredentials[] = [];

    for (const userCredential of initMap.userCredentials) {
      if (await userCredentialsQuery.hasUserCredentialsById(userCredential.id)) {
        continue;
      }

      insertRows.push(userCredential);
    }

    if (insertRows.length === 0) {
      return;
    }

    await userCredentialsQuery.insertUserCredentialsWithBulk(insertRows);
  }
}
