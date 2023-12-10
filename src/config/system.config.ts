import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '@server/common';

export class SystemConfig {
  private readonly configService = new ConfigService();

  private readonly TZ = this.configService.get<string>('TZ');
  private readonly NODE_ENV = this.configService.get<string>('NODE_ENV');

  getTimezone() {
    return this.TZ as string;
  }

  getNodeEnv() {
    return this.NODE_ENV as NodeEnv;
  }
}
