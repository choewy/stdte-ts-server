import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RequestUserID = createParamDecorator((_: unknown, ctx: ExecutionContext): number | null => {
  return ctx.switchToHttp().getRequest().userId ?? null;
});
