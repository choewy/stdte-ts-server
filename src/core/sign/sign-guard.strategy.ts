import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { CookieKey, JwtConfig } from '@server/common';

import { CookieService } from '../cookie';

import { SignAccessPayload } from './types';

@Injectable()
export class SignGuardStrategy extends PassportStrategy(Strategy) {
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
