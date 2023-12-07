import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

import { MetadataKey } from './enums';
import { PolicyLevelMap, Request } from './types';

export const ReqUserID = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().userId,
);

export const ReqUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().user,
);

export const SetPolicyLevel = (value: Partial<PolicyLevelMap>) => SetMetadata(MetadataKey.PolicyLevel, value);
