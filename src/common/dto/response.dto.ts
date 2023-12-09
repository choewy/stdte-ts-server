import { DateTime } from 'luxon';
import { Request } from '../types';

import { ExceptionDto } from './exception.dto';
import { toISO } from '../helpers';
import { AppConfig } from '@server/config';

export class ResponseDto<D> {
  version: string;
  request: {
    id: string;
    requestedAt: string | null;
    responsedAt: string | null;
  };

  data: D | ExceptionDto | null;

  constructor(request: Request, data?: D | ExceptionDto | null) {
    request.responsedAt = DateTime.local();

    this.version = new AppConfig().getVersion();
    this.request = {
      id: request.id,
      requestedAt: toISO(request.requesteAt),
      responsedAt: toISO(request.responsedAt),
    };

    this.data = data ?? null;
  }
}
