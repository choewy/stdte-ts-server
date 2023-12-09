import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

import { RolePolicyProperty } from '@entity';

import { MetadataKey } from './enums';
import { Request } from './types';
import { DateTime } from 'luxon';

export const ReqUserID = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().userId,
);

export const ReqUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().user,
);

export const SetRolePolicy = (value: Partial<RolePolicyProperty>) => SetMetadata(MetadataKey.RolePolicy, value);

export const toISO = (date?: DateTime | Date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    date = DateTime.fromJSDate(date);
  }

  if (date instanceof DateTime) {
    return date.toISO({ includeOffset: false });
  }

  return null;
};
