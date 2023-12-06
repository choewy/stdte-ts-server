import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '@server/common';

export class SystemConfig {
  private readonly configService = new ConfigService();

  private readonly NODE_ENV = this.configService.get<string>('NODE_ENV');

  getNodeEnv() {
    return this.NODE_ENV as NodeEnv;
  }
}
