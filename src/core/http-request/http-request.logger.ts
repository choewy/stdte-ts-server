import { Response } from 'express';

import { HttpRequest, HttpRequestLog } from '@server/common';
import { HttpException, Logger } from '@nestjs/common';

export class HttpRequestLogger extends Logger {
  constructor(private request: HttpRequest, private response: Response) {
    super(HttpRequestLog.name);
  }

  done(): void {
    const message = [this.request.ip, `${this.request.method}(${this.response.statusCode})`, this.request.path].join(
      ' - ',
    );

    if (this.response.statusCode < 300) {
      super.verbose(message);
    } else {
      super.debug(message);
    }
  }

  catch(exception: HttpException, e?: Error): void {
    const message = [this.request.ip, `${this.request.method}(${exception.getStatus()})`, this.request.path];

    if (exception.getStatus() >= 500) {
      message.push(e.stack);

      super.error(message.join(' - '));
    } else {
      message.push(`${exception.name}(${exception.message})`);

      super.warn(message.join(' - '));
    }
  }
}
