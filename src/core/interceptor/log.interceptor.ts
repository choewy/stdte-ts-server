import { Observable, tap } from 'rxjs';
import { Response } from 'express';

import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { InternalServerException, Request } from '@server/common';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  private requestInfo(request: Request): string {
    return JSON.stringify(
      {
        id: request.id,
        params: request.params,
        query: request.query,
        body: request.body,
        requestedAt: request.requesteAt,
        responsedAt: request.responsedAt,
      },
      null,
      2,
    );
  }

  private getNextMessage(request: Request, response: Response) {
    return [request.ip, `${request.method}(${request.path})`, response.statusCode, this.requestInfo(request)].join(
      ' - ',
    );
  }

  private getExceptionMessage(request: Request, exception: HttpException) {
    return [
      request.ip,
      `${request.method}(${request.path})`,
      `${exception.name}(${exception.getStatus()})`,
      this.requestInfo(request),
    ].join(' - ');
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    if (request.ignoreLog === true) {
      return next.handle();
    }

    const classname = context.getClass().name;

    return next.handle().pipe(
      tap({
        next: () => {
          const request = http.getRequest<Request>();
          const response = http.getResponse<Response>();
          const message = this.getNextMessage(request, response);

          this.logger.verbose(message, classname);
        },
        error: (e: HttpException | Error) => {
          const request = http.getRequest<Request>();

          if (e instanceof HttpException) {
            const message = this.getExceptionMessage(request, e);
            this.logger.warn(message, classname);
          } else {
            const message = this.getExceptionMessage(request, new InternalServerException(e));
            this.logger.error(message, { name: e.name, message: e.message, cause: e.cause }, classname);
          }
        },
      }),
    );
  }
}
