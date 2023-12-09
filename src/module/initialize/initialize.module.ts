import { DataSource } from 'typeorm';

import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { InitializeService } from './initialize.service';
import { InitializeMap } from './initialize.map';

@Module({})
export class InitializeModule implements OnApplicationBootstrap {
  onApplicationBootstrap: () => Promise<void>;

  constructor(dataSource: DataSource) {
    this.onApplicationBootstrap = async () => {
      const initializeService = new InitializeService();

      await dataSource.transaction(async (em) => {
        const initializeMap = new InitializeMap(em);
        await initializeService.initSetting(initializeMap, em);
        await initializeService.initUploadLogBatch(initializeMap, em);
        await initializeService.initRoles(initializeMap, em);
        await initializeService.initRolePolicies(initializeMap, em);
        await initializeService.initUsers(initializeMap, em);
        await initializeService.initCredentials(initializeMap, em);
      });
    };
  }
}
