import { Request } from '../types';

import { ExceptionDto } from './exception.dto';

export class ResponseDto<D> {
  request: {
    id: string;
    requestedAt: Date;
    responsedAt: Date;
  };

  data: D | ExceptionDto | null;

  constructor(request: Request, data?: D | ExceptionDto | null) {
    request.responsedAt = new Date();

    this.request = {
      id: request.id,
      requestedAt: request.requesteAt,
      responsedAt: request.responsedAt,
    };

    this.data = data ?? null;
  }
}
