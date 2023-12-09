import { map } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Request, ResponseDto } from '@server/common';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    return next.handle().pipe(
      map((value) => {
        return new ResponseDto<unknown>(request, value);
      }),
    );
  }
}
