import { Request } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Role } from '../entities';

export const RequestUserID = createParamDecorator((_: unknown, ctx: ExecutionContext): number | null => {
  return ctx.switchToHttp().getRequest<Request & { userId?: number }>().userId ?? null;
});

export const RequestUserEmail = createParamDecorator((_: unknown, ctx: ExecutionContext): string | null => {
  return ctx.switchToHttp().getRequest<Request & { userEmail?: string }>().userEmail ?? null;
});

export const RequestUserRole = createParamDecorator((_: unknown, ctx: ExecutionContext): Role | null => {
  return ctx.switchToHttp().getRequest<Request & { userRole?: Role }>().userRole ?? null;
});

export const QueryString = <T>(Dto: ClassConstructor<T>) =>
  createParamDecorator((_: unknown, ctx: ExecutionContext): T => {
    return plainToInstance(Dto, ctx.switchToHttp().getRequest<Request>().query, {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    });
  })();
