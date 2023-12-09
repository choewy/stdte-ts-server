import { v4 } from 'uuid';
import { Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from '@server/common';
import { DateTime } from 'luxon';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: any) => void) {
    req.id = v4();
    req.requesteAt = DateTime.local();

    next();
  }
}
