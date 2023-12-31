import { DataSource } from 'typeorm';

import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';

import { CredentialsStatus } from '@entity';
import { CannotAccessException, Request, CredentialsQuery } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class CredentialsGuard implements CanActivate {
  private readonly credentialsQuery: CredentialsQuery;

  constructor(private readonly dataSource: DataSource) {
    this.credentialsQuery = new CredentialsQuery(this.dataSource);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    if (req.userId == null) {
      throw new CannotAccessException({ credentials: null });
    }

    const credentials = await this.credentialsQuery.findCredentialsByUserId(req.userId);

    if (credentials == null) {
      throw new CannotAccessException({ credentials: null });
    }

    if (credentials.status !== CredentialsStatus.Active) {
      throw new CannotAccessException({ credentials: credentials.status });
    }

    return true;
  }
}
