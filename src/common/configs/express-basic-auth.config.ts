import { BasicAuthMiddlewareOptions } from 'express-basic-auth';

import { ConfigService } from '@nestjs/config';

export class ExpressBasicAuthConfig {
  private readonly configService = new ConfigService();

  private readonly EXPRESS_BASIC_AUTH_ID = this.configService.get<string>('EXPRESS_BASIC_AUTH_ID');
  private readonly EXPRESS_BASIC_AUTH_PASSWORD = this.configService.get<string>('EXPRESS_BASIC_AUTH_PASSWORD');

  public getExpressBasicAuthOptions(): BasicAuthMiddlewareOptions {
    return {
      users: { [this.EXPRESS_BASIC_AUTH_ID]: this.EXPRESS_BASIC_AUTH_PASSWORD },
      challenge: true,
    };
  }
}
