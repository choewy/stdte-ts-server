import { RedisOptions } from 'ioredis';

import { ConfigService } from '@nestjs/config';

export class RedisConfig {
  private readonly configService = new ConfigService();

  private readonly HOST = this.configService.get<string>('REDIS_HOST');
  private readonly PORT = this.configService.get<string>('REDIS_PORT');
  private readonly DB = this.configService.get<string>('REDIS_DB');

  getRedisOptions(): RedisOptions {
    return {
      host: this.HOST,
      port: Number(this.PORT),
      db: Number(this.DB),
      lazyConnect: true,
    };
  }
}
