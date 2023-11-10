import { catchError, tap } from 'rxjs';
import { DataSource } from 'typeorm';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { InjectWriterDataSource, MetadataKey } from '@server/common';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @InjectWriterDataSource()
    private readonly dataSource: DataSource,
    private readonly reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const isIgnoreException = this.reflector.getAllAndOverride(MetadataKey.SetIgnoreException, [
      context.getClass(),
      context.getHandler(),
    ]);

    console.log(isIgnoreException);

    return next.handle().pipe(
      tap(() => {
        console.log('123');
      }),
      catchError((error, caught) => {
        console.log(error, caught);

        throw error;
      }),
    );
  }
}
