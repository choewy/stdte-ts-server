import { DataSource } from 'typeorm';

import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CannotAccessException, MetadataKey, PolicyLevelMap, Request, UserQuery } from '@server/common';

@Injectable({ scope: Scope.REQUEST })
export class RoleGuard implements CanActivate {
  private readonly userQuery: UserQuery;

  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {
    this.userQuery = new UserQuery(this.dataSource);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    if (req.userId == null) {
      throw new CannotAccessException();
    }

    const user = await this.userQuery.findUserWithRoleById(req.userId);

    if (user == null) {
      throw new CannotAccessException({ policy: null });
    }

    if (user.role == null) {
      throw new CannotAccessException({ policy: null });
    }

    const policy = this.reflector.getAllAndOverride<PolicyLevelMap>(MetadataKey.PolicyLevel, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (policy == null) {
      return true;
    }

    const keys = Object.keys(policy) as Array<keyof PolicyLevelMap>;

    for (const key of keys) {
      if (user.role.policy[key] < policy[key]) {
        throw new CannotAccessException({ policy });
      }
    }

    return true;
  }
}
