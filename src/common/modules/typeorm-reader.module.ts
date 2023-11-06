import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { TypeOrmConnection } from '../constants';

export class TypeOrmReaderModule extends TypeOrmModule {
  public static forFeature(entities?: EntityClassOrSchema[]): DynamicModule {
    return super.forFeature(entities, TypeOrmConnection.Reader);
  }
}
