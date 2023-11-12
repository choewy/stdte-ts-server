import { Response } from 'express';
import { DataSource } from 'typeorm';

import { Injectable, Scope } from '@nestjs/common';
import { HttpRequest, HttpRequestLogQuery, InjectWriterDataSource } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestMiddleware {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async use(request: HttpRequest, _: Response, next: (error?: any) => void) {
    request.httpRequestLog = await HttpRequestLogQuery.of(this.dataSource).saveHttpRequestLog({
      ip: request.ip,
      method: request.method,
      path: request.path,
      params: Object.keys(request.params).length > 0 ? JSON.stringify(request.path) : null,
      query: Object.keys(request.query).length > 0 ? JSON.stringify(request.query) : null,
      body: Object.keys(request.body).length > 0 ? JSON.stringify(request.body) : null,
    });

    next();
  }
}
