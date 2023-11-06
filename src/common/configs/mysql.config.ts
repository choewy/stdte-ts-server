import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { NodeEnv, TypeOrmConnection, toBoolean } from '../constants';

export class MySqlConfig {
  private readonly configService = new ConfigService();

  private readonly NODE_ENV = this.configService.get<NodeEnv>('NODE_ENV');
  private readonly MYSQL_WRITER_HOST = this.configService.get<string>('MYSQL_WRITER_HOST');
  private readonly MYSQL_READER_HOST = this.configService.get<string>('MYSQL_READER_HOST');
  private readonly MYSQL_WRITER_PORT = this.configService.get<string>('MYSQL_WRITER_PORT');
  private readonly MYSQL_READER_PORT = this.configService.get<string>('MYSQL_READER_PORT');
  private readonly MYSQL_USER = this.configService.get<string>('MYSQL_USER');
  private readonly MYSQL_PWD = this.configService.get<string>('MYSQL_PWD');
  private readonly MYSQL_DB = this.configService.get<string>('MYSQL_DB');
  private readonly MYSQL_SYNC = this.configService.get<string>('MYSQL_SYNC');
  private readonly MYSQL_LOGGING = this.configService.get<string>('MYSQL_LOGGING');

  public getTypeOrmModuleWriterOptions(entities: Type<any>[]): TypeOrmModuleOptions {
    return {
      name: TypeOrmConnection.Writer,
      type: 'mysql',
      host: this.MYSQL_WRITER_HOST,
      port: Number(this.MYSQL_WRITER_PORT),
      username: this.MYSQL_USER,
      password: this.MYSQL_PWD,
      database: this.MYSQL_DB,
      synchronize: toBoolean(this.MYSQL_SYNC),
      logging: this.NODE_ENV === NodeEnv.Local ? toBoolean(this.MYSQL_LOGGING, false) : ['error', 'warn'],
      timezone: '+09:00',
      autoLoadEntities: true,
      entities,
    };
  }

  public getTypeOrmModuleReaderOptions(entities: Type<any>[]): TypeOrmModuleOptions {
    return {
      name: TypeOrmConnection.Reader,
      type: 'mysql',
      host: this.MYSQL_READER_HOST,
      port: Number(this.MYSQL_READER_PORT),
      username: this.MYSQL_USER,
      password: this.MYSQL_PWD,
      database: this.MYSQL_DB,
      synchronize: false,
      logging: this.NODE_ENV === NodeEnv.Local ? toBoolean(this.MYSQL_LOGGING, false) : ['error', 'warn'],
      timezone: '+09:00',
      autoLoadEntities: true,
      entities,
    };
  }
}
