import { lastValueFrom } from 'rxjs';

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OnEvent } from '@nestjs/event-emitter';

import { SlackEvent } from '@server/common';
import { SlackConfig, SystemConfig } from '@server/config';

import { SlackWebhookDto } from './dto';
import { SlackWebhookSendError } from './errors';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly slackConfig = new SlackConfig();
  private readonly systemConfig = new SystemConfig();

  constructor(private readonly httpService: HttpService) {}

  @OnEvent(SlackEvent.Webhook)
  async sendWebhook(dto: SlackWebhookDto): Promise<void> {
    await lastValueFrom(
      this.httpService.post<void>(
        this.slackConfig.getWebhookUrl(),
        dto.replaceUserNameWithNodeEnvText(this.systemConfig.getNodeEnvText()),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    ).catch((e) => {
      this.logger.warn(new SlackWebhookSendError(e).toString());
    });
  }
}
