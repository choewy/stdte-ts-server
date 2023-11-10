import { tap } from 'rxjs';
import { Response } from 'express';
import { DataSource } from 'typeorm';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';

import { HttpRequest, HttpRequestLog, InjectWriterDataSource } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestInterceptor implements NestInterceptor {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      tap(async () => {
        const http = context.switchToHttp();
        const request = http.getRequest<HttpRequest>();
        const response = http.getResponse<Response>();

        const httpRequestLog = request.httpRequestLog;

        if (httpRequestLog === undefined) {
          return;
        }

        const httpRequestLogRepository = this.dataSource.getRepository(HttpRequestLog);
        await httpRequestLogRepository.update(httpRequestLog.id, {
          user: { id: request.userId },
          status: response.statusCode,
        });
      }),
    );
  }
}
