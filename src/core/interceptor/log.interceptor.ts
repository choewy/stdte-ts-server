import { Observable, tap } from 'rxjs';
import { Response } from 'express';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { HttpLogDto, Request } from '@server/common';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

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
          const log = new HttpLogDto(request, response);

          this.logger.verbose(log.getNextMessage(), classname);
        },
      }),
    );
  }
}
