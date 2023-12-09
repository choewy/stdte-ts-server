import { DataSource } from 'typeorm';

import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { InitializeMap } from './initialize.map';
import { Initializer } from './initializer';

@Module({})
export class InitializeModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    const initializer = new Initializer();

    await this.dataSource.transaction(async (em) => {
      const initializeMap = new InitializeMap(em);
      await initializer.initSetting(initializeMap, em);
      await initializer.initUploadLogBatch(initializeMap, em);
      await initializer.initRoles(initializeMap, em);
      await initializer.initRolePolicies(initializeMap, em);
      await initializer.initUsers(initializeMap, em);
      await initializer.initCredentials(initializeMap, em);
    });
  }
}
