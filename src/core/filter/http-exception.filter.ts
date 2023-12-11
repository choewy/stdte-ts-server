import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

import { ExceptionDto, HttpLogDto, InternalServerException, Request, ResponseDto } from '@server/common';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(e: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const log = new HttpLogDto(request, response);

    let exception: HttpException;

    if (e instanceof HttpException) {
      exception = e;
      this.logger.warn(log.getExceptionMessage(e));
    } else {
      exception = new InternalServerException(e);
      this.logger.error(log.getExceptionMessage(exception), {
        name: e.name,
        message: e.message,
        cause: e.cause,
      });
    }

    response.status(exception.getStatus());
    response.send(new ResponseDto(request, new ExceptionDto(exception)));
  }
}
