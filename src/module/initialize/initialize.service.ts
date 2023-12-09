import { DataSource, EntityManager } from 'typeorm';

import { Role, RolePolicy, User, Credentials, ROLE_POLICY_KEY } from '@entity';
import {
  RolePolicyQuery,
  RoleQuery,
  CredentialsQuery,
  UserQuery,
  UploadLogBatchQuery,
  SettingQuery,
} from '@server/common';

import { InitializeMap } from './initialize.map';

export class InitializeService {
  async initSetting(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new SettingQuery(connection);
    const row = await query.findSetting();

    if (row) {
      return;
    }

    await query.upsertSetting(initializeMap.setting);
  }

  async initUploadLogBatch(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new UploadLogBatchQuery(connection);
    const row = await query.findLogBatch();

    if (row && row.working === false) {
      return;
    }

    await query.upsertLogBatch(initializeMap.uploadLogBatch);
  }

  async initRoles(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new RoleQuery(connection);
    const rows = await query.findRolesByOnInit();

    const entities: Role[] = [];

    for (const entity of initializeMap.roles) {
      const row = rows.find((row) => row.id === entity.id);

      if (row == null) {
        entities.push(entity);
        continue;
      }

      if (row.name !== entity.name) {
        entities.push(entity);
        continue;
      }
    }

    if (entities.length === 0) {
      return;
    }

    await query.upsertRoles(entities);
  }

  async initRolePolicies(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new RolePolicyQuery(connection);
    const rows = await query.findRolePoliciesByOnInit();

    const entities: RolePolicy[] = [];

    for (const entity of initializeMap.rolePolicies) {
      const row = rows.find((row) => row.id === entity.id);

      if (row == null) {
        entities.push(entity);
        continue;
      }

      const keys = Object.values(ROLE_POLICY_KEY);

      for (const key of keys) {
        if (row[key] !== entity[key]) {
          entities.push(entity);
          break;
        }
      }
    }

    if (entities.length === 0) {
      return;
    }

    await query.upsertRolePolicies(entities);
  }

  async initUsers(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new UserQuery(connection);
    const rows = await query.findUsersByOnInit();

    const entities: User[] = [];

    for (const entity of initializeMap.users) {
      const row = rows.find((row) => row.id === entity.id);

      if (row == null) {
        entities.push(entity);
        continue;
      }
    }

    if (entities.length === 0) {
      return;
    }

    await query.upsertUsers(entities);
  }

  async initCredentials(initializeMap: InitializeMap, connection: DataSource | EntityManager) {
    const query = new CredentialsQuery(connection);
    const rows = await query.findCredentialsByOnInit();

    const entities: Credentials[] = [];

    for (const entity of initializeMap.credentials) {
      const row = rows.find((row) => row.id === entity.id);

      if (row == null) {
        entities.push(entity);
        continue;
      }
    }

    if (entities.length === 0) {
      return;
    }

    await query.upsertCredentials(entities);
  }
}
