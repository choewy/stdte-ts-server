import { DataSource } from 'typeorm';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AccessDeninedException, MapResponseDto, User, UserQuery, toRolePolicyText } from '@server/common';

import { SetRoleGuardMetadataArgs, SetRoleGuardMetadataKeys } from './types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request & { userId?: number }>();

    if (request.userId === undefined) {
      throw new AccessDeninedException({ cause: 'request.userId is undefined' });
    }

    const userQuery = UserQuery.withDataSource(User, this.dataSource);
    const user = await userQuery.findUserRoleByUserId(request.userId);

    if (user?.role?.rolePolicy === undefined) {
      throw new AccessDeninedException({ cause: 'user.role.rolePolicy is undefined' });
    }

    const roleGuardMetadata = this.reflector.getAllAndOverride<SetRoleGuardMetadataArgs>(RoleGuard.name, [
      context.getClass(),
      context.getHandler(),
    ]);

    const keys = Object.keys(roleGuardMetadata) as SetRoleGuardMetadataKeys[];

    for (const key of keys) {
      const userValue = user.role.rolePolicy[key];
      const guardValue = roleGuardMetadata[key];

      if (userValue < guardValue) {
        throw new AccessDeninedException({
          key,
          user: new MapResponseDto(userValue, toRolePolicyText),
          metadata: new MapResponseDto(guardValue, toRolePolicyText),
        });
      }
    }

    return true;
  }
}
