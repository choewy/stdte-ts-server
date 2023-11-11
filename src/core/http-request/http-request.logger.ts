import { STATUS_CODES } from 'http';
import { Response } from 'express';

import { HttpException, Injectable, Logger, Scope } from '@nestjs/common';

import { HttpRequest, HttpRequestLog } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestLogger extends Logger {
  constructor() {
    super(HttpRequestLog.name);
  }

  done(request: HttpRequest, response: Response): void {
    const redirect = response.statusCode >= 300;
    const messages = [
      request.ip,
      `${request.method}(${response.statusCode})`,
      request.path,
      STATUS_CODES[response.statusCode],
    ];

    super[redirect ? 'debug' : 'verbose'](messages.join(' - '));
  }

  catch(request: HttpRequest, exception: HttpException, e?: Error): void {
    const error = exception.getStatus() >= 500;
    const messages = [request.ip, `${request.method}(${exception.getStatus()})`, request.path];

    if (error) {
      messages.push(e.stack);
    } else {
      messages.push(exception.name);
    }

    super[error ? 'error' : 'warn'](messages.join(' - '));
  }
}
