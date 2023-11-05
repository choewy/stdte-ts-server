import { ConfigService } from '@nestjs/config';

export class VersionConfig {
  private readonly configService = new ConfigService();

  private readonly VERSION = this.configService.get<string>('VERSION');

  public getVersion(): string {
    return this.VERSION;
  }
}
