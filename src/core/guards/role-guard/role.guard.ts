import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AccessDeninedException, HttpRequest, ROLE_POLICY_SCOPE_TEXTS } from '@server/common';
import { EnumMapResponseDto } from '@server/dto';

import { SetRoleGuardMetadataArgs, SetRoleGuardMetadataKeys } from './types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();

    if (request.user == null) {
      throw new AccessDeninedException({ cause: 'request.user is null' });
    }

    const roleGuardMetadata = this.reflector.getAllAndOverride<SetRoleGuardMetadataArgs>(RoleGuard.name, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (roleGuardMetadata == null) {
      return true;
    }

    const roleGuardMetadataKeys = Object.keys(roleGuardMetadata) as SetRoleGuardMetadataKeys[];

    if (roleGuardMetadataKeys.length === 0) {
      return true;
    }

    if (request.user?.role?.rolePolicy == null) {
      throw new AccessDeninedException({ cause: 'user.role.rolePolicy is undefined' });
    }

    for (const key of roleGuardMetadataKeys) {
      const userRoleScope = request.user.role.rolePolicy[key];
      const guardRoleScope = roleGuardMetadata[key];

      if (userRoleScope < guardRoleScope) {
        throw new AccessDeninedException({
          key,
          user: new EnumMapResponseDto(userRoleScope, ROLE_POLICY_SCOPE_TEXTS),
          metadata: new EnumMapResponseDto(guardRoleScope, ROLE_POLICY_SCOPE_TEXTS),
        });
      }
    }

    return true;
  }
}
