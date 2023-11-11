import { tap } from 'rxjs';
import { Response } from 'express';
import { DataSource } from 'typeorm';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';

import { HttpRequest, HttpRequestLog, InjectWriterDataSource } from '@server/common';

import { HttpRequestLogger } from './http-request.logger';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestInterceptor implements NestInterceptor {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
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
        const httpRequestLogRepository = this.dataSource.getRepository(HttpRequestLog);
        await httpRequestLogRepository.update(request.httpRequestLog.id, {
          user: { id: request.userId },
          status: response.statusCode,
        });
      }

      new HttpRequestLogger(request, response).done();
    };
  }
}