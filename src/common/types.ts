import { Request as ExpressRequest } from 'express';

import { User } from '@entity';

import { ResponseDto } from './dto';

export type Request<T = any> = ExpressRequest & {
  dto: ResponseDto<T>;
  userId?: number | null;
  user?: User | null;
};
