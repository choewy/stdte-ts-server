import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';

import { ExceptionDto, Request } from '@server/common';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(e: HttpException | Error, host: ArgumentsHost) {
    let exception: HttpException;

    if (e instanceof HttpException) {
      exception = e;
    } else {
      exception = new InternalServerErrorException(e);
    }

    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    res.status(exception.getStatus()).send(new ExceptionDto(exception));
  }
}
