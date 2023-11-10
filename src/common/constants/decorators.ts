import { ClassConstructor, plainToInstance } from 'class-transformer';

import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { TypeOrmConnection, HttpRequest, MetadataKey } from '../constants';
import { HttpRequestLog, Role } from '../entities';

export const InjectWriterDataSource = () => InjectDataSource(TypeOrmConnection.Writer);
export const InjectReaderDataSource = () => InjectDataSource(TypeOrmConnection.Reader);

export const RequestUserID = createParamDecorator((_: unknown, ctx: ExecutionContext): number | null => {
  return ctx.switchToHttp().getRequest<HttpRequest>().userId ?? null;
});

export const RequestUserEmail = createParamDecorator((_: unknown, ctx: ExecutionContext): string | null => {
  return ctx.switchToHttp().getRequest<HttpRequest>().userEmail ?? null;
});

export const RequestUserRole = createParamDecorator((_: unknown, ctx: ExecutionContext): Role | null => {
  return ctx.switchToHttp().getRequest<HttpRequest>().userRole ?? null;
});

export const RequestLog = createParamDecorator((_: unknown, ctx: ExecutionContext): HttpRequestLog | null => {
  return ctx.switchToHttp().getRequest<HttpRequest>().httpRequestLog ?? null;
});

export const QueryString = <T>(Dto: ClassConstructor<T>) =>
  createParamDecorator((_: unknown, ctx: ExecutionContext): T => {
    return plainToInstance(Dto, ctx.switchToHttp().getRequest<HttpRequest>().query, {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    });
  })();

export const SetIgnoreException = () => SetMetadata(MetadataKey.SetIgnoreException, true);
