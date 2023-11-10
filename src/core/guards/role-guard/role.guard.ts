import { DataSource } from 'typeorm';

import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import {
  AccessDeninedException,
  HttpRequest,
  InjectReaderDataSource,
  RolePolicyScopeMapResponseDto,
  UserQuery,
} from '@server/common';

import { SetRoleGuardMetadataArgs, SetRoleGuardMetadataKeys } from './types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();

    if (request.userId === undefined) {
      throw new AccessDeninedException({ cause: 'request.userId is undefined' });
    }

    const roleGuardMetadata = this.reflector.getAllAndOverride<SetRoleGuardMetadataArgs>(RoleGuard.name, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (roleGuardMetadata === undefined) {
      return true;
    }

    const userQuery = UserQuery.of(this.readerDataSource);
    const user = await userQuery.findUserRoleByUserId(request.userId);

    request.userRole = user?.role;

    if (request.userRole?.rolePolicy === undefined) {
      throw new AccessDeninedException({ cause: 'user.role.rolePolicy is undefined' });
    }

    const roleGuardMetadataKeys = Object.keys(roleGuardMetadata) as SetRoleGuardMetadataKeys[];

    for (const key of roleGuardMetadataKeys) {
      const userValue = user.role.rolePolicy[key];
      const guardValue = roleGuardMetadata[key];

      if (userValue < guardValue) {
        throw new AccessDeninedException({
          key,
          user: new RolePolicyScopeMapResponseDto(userValue),
          metadata: new RolePolicyScopeMapResponseDto(guardValue),
        });
      }
    }

    return true;
  }
}
