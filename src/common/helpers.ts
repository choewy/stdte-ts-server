import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

import { RolePolicyProperty } from '@entity';

import { MetadataKey } from './enums';
import { Request } from './types';

export const ReqUserID = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().userId,
);

export const ReqUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().user,
);

export const SetRolePolicy = (value: Partial<RolePolicyProperty>) => SetMetadata(MetadataKey.RolePolicy, value);
