import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { Injectable, Scope } from '@nestjs/common';
import { HttpRequestLog, InjectWriterDataSource } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestMiddleware {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async use(request: Request & { httpRequestLog: HttpRequestLog }, _: Response, next: (error?: any) => void) {
    const httpRequestLogRepository = this.dataSource.getRepository(HttpRequestLog);
    const httpRequestLog = httpRequestLogRepository.create({
      ip: request.ip,
      method: request.method,
      path: request.path,
      params: request.params,
      query: request.query,
      body: request.body,
    });

    request.httpRequestLog = await httpRequestLogRepository.save(httpRequestLog);

    next();
  }
}
