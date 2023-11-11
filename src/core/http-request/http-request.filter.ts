import { Response } from 'express';
import { DataSource } from 'typeorm';

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { HttpRequest, HttpRequestLog, InjectWriterDataSource } from '@server/common';

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class HttpRequestFilter extends BaseExceptionFilter {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async catch(e: Error | HttpException, host: ArgumentsHost): Promise<void> {
    const http = host.switchToHttp();
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<Response>();

    let exception: HttpException;

    if (e instanceof HttpException) {
      exception = e;
    } else {
      exception = new InternalServerErrorException({
        name: e.name,
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    if (request.httpRequestLog) {
      const httpRequestLogRepository = this.dataSource.getRepository(HttpRequestLog);
      await httpRequestLogRepository.update(request.httpRequestLog.id, {
        user: { id: request.userId },
        exception: exception.getResponse() as object,
        status: exception.getStatus(),
      });
    }

    response.status(exception.getStatus()).send(exception.getResponse());
  }
}
