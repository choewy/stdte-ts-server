import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SlackConfig } from '@server/config';

@Module({
  imports: [HttpModule.register({ baseURL: new SlackConfig().getWebhookUrl() })],
})
export class SlackModule {}
