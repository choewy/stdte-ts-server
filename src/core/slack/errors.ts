import { AxiosError } from 'axios';

export class SlackWebhookSendError extends Error {
  constructor(e?: AxiosError | Error) {
    super();

    this.name = SlackWebhookSendError.name;
    this.message = 'slack webhook send failed';

    const cause = { name: e?.name, message: e?.message, details: undefined as unknown };

    if (e instanceof AxiosError) {
      cause.details = { status: e.status, ...(e.response?.data ?? {}), ...(e?.cause ?? {}) };
    } else {
      cause.details = e?.cause;
    }

    this.cause = cause;
  }

  toString(): string {
    return JSON.stringify({ name: this.name, message: this.message, cause: this.cause }, null, 2);
  }
}
