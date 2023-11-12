import { tap } from 'rxjs';
import { STATUS_CODES } from 'http';
import { Response } from 'express';
import { DataSource } from 'typeorm';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';

import { HttpRequest, HttpRequestLogQuery, InjectWriterDataSource } from '@server/common';

import { HttpRequestLogger } from './http-request.logger';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestInterceptor implements NestInterceptor {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
    private readonly logger: HttpRequestLogger,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(tap(this.tabObserverOrNext(context)));
  }

  private tabObserverOrNext(context: ExecutionContext): () => Promise<void> {
    return async () => {
      const http = context.switchToHttp();
      const request = http.getRequest<HttpRequest>();
      const response = http.getResponse<Response>();

      if (request.httpRequestLog) {
        const httpRequestLogQuery = HttpRequestLogQuery.of(this.dataSource);
        await httpRequestLogQuery.updateHttpRequestLog(request.httpRequestLog.id, {
          user: { id: request.user?.id },
          statusCode: response.statusCode,
          statusMessage: STATUS_CODES[response.statusCode],
        });
      }

      this.logger.done(request, response);
    };
  }
}
