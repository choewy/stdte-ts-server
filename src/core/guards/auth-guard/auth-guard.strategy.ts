import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { CookieKey, JwtConfig } from '@server/common';
import { CookieService } from '@server/core/cookie';
import { SignAccessPayload } from '@server/core/sign';

@Injectable()
export class AuthGuardStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => new CookieService().get(request, CookieKey.Access)]),
      secretOrKey: new JwtConfig().getSecret(),
      ignoreExpiration: false,
    });
  }

  validate(payload: SignAccessPayload) {
    return payload;
  }
}
