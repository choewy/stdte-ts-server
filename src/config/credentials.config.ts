import { ConfigService } from '@nestjs/config';

export class CredentialsConfig {
  private readonly configService = new ConfigService();

  private readonly DEVELOPER_EMAIL = this.configService.get<string>('DEVELOPER_EMAIL');
  private readonly DEVELOPER_PASSWORD = this.configService.get<string>('DEVELOPER_PASSWORD');

  private readonly ADMIN_EMAIL = this.configService.get<string>('ADMIN_EMAIL');
  private readonly ADMIN_PASSWORD = this.configService.get<string>('ADMIN_PASSWORD');

  public getDeveloperCredentials() {
    return {
      email: this.DEVELOPER_EMAIL ?? '',
      password: this.DEVELOPER_PASSWORD ?? '',
    };
  }

  public getAdminCredentials() {
    return {
      email: this.ADMIN_EMAIL ?? '',
      password: this.ADMIN_PASSWORD ?? '',
    };
  }
}
