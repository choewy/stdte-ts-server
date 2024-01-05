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

  getNodeEnvText() {
    switch (this.NODE_ENV) {
      case NodeEnv.Local:
        return '로컬';

      case NodeEnv.Develop:
        return '개발';

      case NodeEnv.Product:
        return '상용';

      default:
        return this.NODE_ENV ?? '';
    }
  }
}
