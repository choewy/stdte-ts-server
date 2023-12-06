import { DataSource } from 'typeorm';

import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';

import { CredentialStatus } from '@entity';
import { CannotAccessException, Request, UserCredentialsQuery } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class CredentialsGuard implements CanActivate {
  private readonly userCredentialsQuery: UserCredentialsQuery;

  constructor(private readonly dataSource: DataSource) {
    this.userCredentialsQuery = new UserCredentialsQuery(this.dataSource);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    if (req.userId == null) {
      throw new CannotAccessException();
    }

    const credentials = await this.userCredentialsQuery.findUserCredentialsByUserId(req.userId);

    if (credentials == null) {
      throw new CannotAccessException();
    }

    if (credentials.status !== CredentialStatus.Active) {
      throw new CannotAccessException();
    }

    return true;
  }
}
