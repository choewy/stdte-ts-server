import { ClassConstructor, plainToInstance } from 'class-transformer';

import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { TypeOrmConnection, HttpRequest, MetadataKey } from '../constants';
import { HttpRequestLog, User } from '../entities';

export const InjectWriterDataSource = () => InjectDataSource(TypeOrmConnection.Writer);
export const InjectReaderDataSource = () => InjectDataSource(TypeOrmConnection.Reader);

export const RequestUser = createParamDecorator((_: unknown, ctx: ExecutionContext): User | null => {
  return ctx.switchToHttp().getRequest<HttpRequest>().user ?? null;
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
