import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { Request, UserQuery } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class UserInterceptor implements NestInterceptor {
  private readonly userQuery: UserQuery;

  constructor(dataSource: DataSource) {
    this.userQuery = new UserQuery(dataSource);
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    if (req.userId) {
      req.user = await this.userQuery.findUserByIdAtInterceptor(req.userId);
    }

    return next.handle();
  }
}
