import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export class CorsConfig {
  private readonly configService = new ConfigService();

  private readonly CORS_ORIGINS = this.configService.get<string>('CORS_ORIGINS');

  public getCorsOptions(): CorsOptions {
    return {
      origin: new RegExp(this.CORS_ORIGINS),
      credentials: true,
      preflightContinue: false,
    };
  }
}
