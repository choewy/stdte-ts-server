import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { NodeEnv, toBoolean } from '../constants';

export class MySqlConfig {
  private readonly configService = new ConfigService();

  private readonly NODE_ENV = this.configService.get<NodeEnv>('NODE_ENV');
  private readonly MYSQL_HOST = this.configService.get<string>('MYSQL_HOST');
  private readonly MYSQL_PORT = this.configService.get<string>('MYSQL_PORT');
  private readonly MYSQL_USER = this.configService.get<string>('MYSQL_USER');
  private readonly MYSQL_PWD = this.configService.get<string>('MYSQL_PWD');
  private readonly MYSQL_DB = this.configService.get<string>('MYSQL_DB');
  private readonly MYSQL_SYNC = this.configService.get<string>('MYSQL_SYNC');
  private readonly MYSQL_LOGGING = this.configService.get<string>('MYSQL_LOGGING');

  public getTypeOrmModuleOptions(entities: Type<any>[]): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.MYSQL_HOST,
      port: Number(this.MYSQL_PORT),
      username: this.MYSQL_USER,
      password: this.MYSQL_PWD,
      database: this.MYSQL_DB,
      synchronize: toBoolean(this.MYSQL_SYNC),
      logging: this.NODE_ENV === NodeEnv.Local ? toBoolean(this.MYSQL_LOGGING, false) : ['error', 'warn'],
      timezone: '+09:00',
      autoLoadEntities: true,
      dropSchema: true,
      entities,
    };
  }
}
