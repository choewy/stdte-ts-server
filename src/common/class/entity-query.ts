import { DataSource, EntityManager, ObjectLiteral, Repository } from 'typeorm';

import { Type } from '@nestjs/common';

export class EntityQuery<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;

  constructor(connection: DataSource | EntityManager, entity: Type<T>) {
    this.repository = connection.getRepository(entity);
  }
}
