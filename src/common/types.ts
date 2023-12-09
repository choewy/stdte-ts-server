import { Request as ExpressRequest } from 'express';

import { User } from '@entity';

export type Request = ExpressRequest & {
  id: string;
  requesteAt: Date;
  responsedAt: Date;
  userId?: number | null;
  user?: User | null;
};
