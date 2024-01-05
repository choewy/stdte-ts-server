import { SlackColor, SlackIcon } from '../enums';
import { SlackWebhookAttachment } from '../types';

export class SlackWebhookDto {
  readonly unfurl_links = true;

  username: string;
  icon_emoji: string;
  attachments?: SlackWebhookAttachment[];

  constructor(title: string, icon: SlackIcon, attachments?: SlackWebhookAttachment[]) {
    this.username = title;
    this.icon_emoji = icon;
    this.attachments = attachments;
  }

  replaceUserNameWithNodeEnvText(nodeEnvText: string) {
    this.username = `[${nodeEnvText}] ${this.username}`;

    return this;
  }
}

export class SlackWebhookSendErrorDto extends SlackWebhookDto {
  constructor(error: Error) {
    super('error occurred', SlackIcon.Warning);

    this.attachments = [
      {
        fallback: '',
        color: SlackColor.Danger,
        fields: [{ title: 'Name', value: `\`\`\`${error.name}\`\`\`` }],
      },
      {
        fallback: '',
        color: SlackColor.Danger,
        fields: [{ title: 'Message', value: `\`\`\`${error.message}\`\`\`` }],
      },
      {
        fallback: '',
        color: SlackColor.Danger,
        fields: [{ title: 'Detail', value: `\`\`\`${error.cause ?? error.stack}\`\`\`` }],
      },
    ];
  }
}
