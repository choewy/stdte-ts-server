import { DataSource } from 'typeorm';

import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { InitService } from './init.service';

@Module({})
export class InitModule implements OnApplicationBootstrap {
  onApplicationBootstrap: () => Promise<void>;

  constructor(dataSource: DataSource) {
    this.onApplicationBootstrap = async () => {
      const initService = new InitService();

      await dataSource.transaction(async (em) => {
        await initService.initRoles(em);
        await initService.initRolePolicies(em);
        await initService.initUsers(em);
        await initService.initUserCredentials(em);
      });
    };
  }
}
