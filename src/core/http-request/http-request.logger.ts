import { Response } from 'express';

import { HttpException, Logger } from '@nestjs/common';

import { HttpRequest, HttpRequestLog } from '@server/common';

export class HttpRequestLogger extends Logger {
  constructor(private request: HttpRequest, private response: Response) {
    super(HttpRequestLog.name);
  }

  done(): void {
    const redirect = this.response.statusCode >= 300;
    const messages = [this.request.ip, `${this.request.method}(${this.response.statusCode})`, this.request.path];

    super[redirect ? 'debug' : 'verbose'](messages.join(' - '));
  }

  catch(exception: HttpException, e?: Error): void {
    const error = exception.getStatus() >= 500;
    const messages = [this.request.ip, `${this.request.method}(${exception.getStatus()})`, this.request.path];

    if (error) {
      messages.push(e.stack);
    } else {
      messages.push(`${exception.name}(${exception.message})`);
    }

    super[error ? 'error' : 'warn'](messages.join(' - '));
  }
}
