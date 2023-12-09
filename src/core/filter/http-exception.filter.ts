import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';

import { ExceptionDto, Request, ResponseDto } from '@server/common';

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
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    response.status(exception.getStatus());
    response.send(new ResponseDto(request, new ExceptionDto(exception)));
  }
}
