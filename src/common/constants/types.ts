import { Request } from 'express';

import { HttpRequestLog, Role } from '../entities';

export type HttpRequest = Request & {
  httpRequestLog: HttpRequestLog;
  userId?: number;
  userEmail?: string;
  userRole?: Role;
};

export type LazyType<T> = T | Promise<T>;
export type LazyWithNullType<T> = T | null | Promise<T | null>;
