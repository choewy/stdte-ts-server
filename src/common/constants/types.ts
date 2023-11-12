import { Request } from 'express';

import { HttpRequestLog, Role } from '../entities';
import { AuthStatusValue, EmploymentStatusValue } from './enums';

export type HttpRequest = Request & {
  httpRequestLog: HttpRequestLog;
  userId?: number;
  userEmail?: string;
  userName?: string;
  userRole?: Role;
  userAuthStatus?: AuthStatusValue;
  userEmploymentStatus?: EmploymentStatusValue;
};

export type LazyType<T> = T | Promise<T>;
export type LazyWithNullType<T> = T | null | Promise<T | null>;
