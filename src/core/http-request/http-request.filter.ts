import { STATUS_CODES } from 'http';
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

import { HttpRequest, HttpRequestLogQuery, InjectWriterDataSource } from '@server/common';
import { ExceptionResponseDetailsDto } from '@server/dto';

import { HttpRequestLogger } from './http-request.logger';

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class HttpRequestFilter extends BaseExceptionFilter {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
    private readonly logger: HttpRequestLogger,
  ) {
    super();
  }

  async catch(e: Error | HttpException, host: ArgumentsHost): Promise<void> {
    const http = host.switchToHttp();
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<Response>();

    let error: Error;
    let exception: HttpException;

    if (e instanceof HttpException) {
      error = null;
      exception = e;
    } else {
      error = e;
      exception = new InternalServerErrorException({
        name: error.name,
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    if (request.httpRequestLog) {
      const httpRequestLogQuery = HttpRequestLogQuery.of(this.dataSource);
      await httpRequestLogQuery.updateHttpRequestLog(request.httpRequestLog.id, {
        user: { id: request.user?.id },
        statusCode: exception.getStatus(),
        statusMessage: STATUS_CODES[exception.getStatus()],
        exceptionName: exception.name,
        exceptionMessage: (exception.getResponse() as ExceptionResponseDetailsDto).message,
        errorName: error?.name,
        errorMessage: error?.message,
        errorStack: error?.stack,
      });
    }

    this.logger.catch(request, exception, e);

    response.status(exception.getStatus()).send(exception.getResponse());
  }
}
