import { v4 } from 'uuid';
import { Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from '@server/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: any) => void) {
    req.id = v4();
    req.requesteAt = new Date();

    next();
  }
}
