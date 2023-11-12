import { Request } from 'express';

import { HttpRequestLog, User } from '../entities';

export type HttpRequest = Request & {
  httpRequestLog: HttpRequestLog;
  user?: User;
};

export type LazyType<T> = T | Promise<T>;
export type LazyWithNullType<T> = T | null | Promise<T | null>;
