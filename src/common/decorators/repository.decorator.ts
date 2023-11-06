import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { TypeOrmConnection } from '../constants';

export const InjectReaderRepository = (Entity: EntityClassOrSchema) =>
  InjectRepository(Entity, TypeOrmConnection.Reader);
