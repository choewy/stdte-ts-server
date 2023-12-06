import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { entityTargets } from '@entity';

export class MySQLConfig {
  private readonly configService = new ConfigService();

  private readonly HOST = this.configService.get<string>('MYSQL_HOST');
  private readonly PORT = this.configService.get<string>('MYSQL_PORT');
  private readonly USERNAME = this.configService.get<string>('MYSQL_USERNAME');
  private readonly PASSWORD = this.configService.get<string>('MYSQL_PASSWORD');
  private readonly DATABASE = this.configService.get<string>('MYSQL_DATABASE');
  private readonly TIMEZONE = this.configService.get<string>('MYSQL_TIMEZONE');

  getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      entities: entityTargets,
      autoLoadEntities: true,
      logging: true,
    };
  }
}
