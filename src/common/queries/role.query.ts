import { DataSource, Repository } from 'typeorm';

import { Type } from '@nestjs/common';

import { BaseQuery } from '../constants';
import { Role } from '../entities';

export class RoleQuery extends BaseQuery<Role> {
  public static withRepository(repository: Repository<Role>) {
    return new RoleQuery(repository);
  }

  public static withDataSource(Entity: Type<Role>, dataSource: DataSource) {
    return new RoleQuery(dataSource.getRepository(Entity));
  }
}
