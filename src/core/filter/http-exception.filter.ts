import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ExceptionDto, HttpLogDto, InternalServerException, Request, ResponseDto, SlackEvent } from '@server/common';
import { SlackWebhookSendErrorDto } from '@server/core';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  catch(e: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const log = new HttpLogDto(request, response);

    let error: Error | null = null;
    let exception: HttpException;

    if (e instanceof HttpException) {
      exception = e;
    } else {
      error = e;
      exception = new InternalServerException(error);
    }

    const dto = new ResponseDto(request, new ExceptionDto(exception));

    this.logger[error === null ? 'warn' : 'error'](
      log.getExceptionMessage(exception),
      error
        ? {
            name: error?.name,
            message: error?.message,
            cause: error?.cause,
          }
        : undefined,
    );

    if (error) {
      this.eventEmitter.emit(SlackEvent.Webhook, new SlackWebhookSendErrorDto(error));
    }

    response.status(exception.getStatus()).send(dto);
  }
}
