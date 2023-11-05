import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { InvalidJwtTokenException } from '@server/common';

import { SignAccessPayload } from './types';

@Injectable()
export class SignGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<Payload extends SignAccessPayload>(e: unknown, payload: Payload, _: any, context: ExecutionContext) {
    if (e || !payload) {
      throw new InvalidJwtTokenException(e);
    }

    context.switchToHttp().getRequest().userId = payload['id'];

    return payload;
  }
}
