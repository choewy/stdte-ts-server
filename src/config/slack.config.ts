import { ConfigService } from '@nestjs/config';

export class SlackConfig {
  private readonly configService = new ConfigService();

  private readonly WEBHOOK_URL = this.configService.get<string>('SLACK_WEBHOOK_URL');

  getWebhookUrl() {
    return this.WEBHOOK_URL ?? '';
  }
}
