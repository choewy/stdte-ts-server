import { SlackColor } from './enums';

export type SlackWebhookField = {
  title: string;
  value: string;
  short?: boolean;
};

export type SlackWebhookAttachment = {
  text?: string;
  pretext?: string;
  fallback: string;
  color: SlackColor;
  fields: SlackWebhookField[];
};
