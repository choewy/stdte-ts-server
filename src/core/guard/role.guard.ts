import { DataSource } from 'typeorm';

import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CannotAccessException, MetadataKey, PolicyLevelMetadataValue, Request, UserQuery } from '@server/common';

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
      throw new CannotAccessException();
    }

    if (user.role == null) {
      throw new CannotAccessException();
    }

    const policyLevelMap = this.reflector.getAllAndOverride<PolicyLevelMetadataValue>(MetadataKey.PolicyLevel, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (policyLevelMap == null) {
      return true;
    }

    const keys = Object.keys(policyLevelMap) as Array<keyof PolicyLevelMetadataValue>;

    for (const key of keys) {
      if (user.role.policy[key] < policyLevelMap[key]) {
        throw new CannotAccessException();
      }
    }

    return true;
  }
}
