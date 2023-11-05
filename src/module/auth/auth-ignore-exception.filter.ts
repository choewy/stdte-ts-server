import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AuthResponseDto } from './dto';

@Catch(HttpException)
export class AuthIgnoreExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return host
      .switchToHttp()
      .getResponse<Response>()
      .status(HttpStatus.OK)
      .send(new AuthResponseDto(false, exception.getResponse()));
  }
}
