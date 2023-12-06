import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

import { MetadataKey } from './enums';
import { PolicyLevelMetadataValue, Request } from './types';

export const ReqUserID = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().userId,
);

export const SetPolicyLevel = (value: Partial<PolicyLevelMetadataValue>) => SetMetadata(MetadataKey.PolicyLevel, value);
