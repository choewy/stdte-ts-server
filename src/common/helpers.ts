import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from './types';

export const ReqUserID = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().userId,
);
