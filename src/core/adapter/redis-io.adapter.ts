import IoRedis from 'ioredis';
import { Server, ServerOptions } from 'socket.io';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

import { RedisConfig } from '@server/config';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const options = new RedisConfig().getRedisOptions();

    const pub = new IoRedis(options);
    const sub = new IoRedis(options);

    await Promise.all([pub.connect(), sub.connect()]);

    this.adapterConstructor = createAdapter(pub, sub);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    server.adapter(this.adapterConstructor);

    return server;
  }
}
