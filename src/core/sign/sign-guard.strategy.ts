import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { CookieKey, InvalidJwtTokenException, JwtConfig } from '@server/common';

import { CookieService } from '../cookie';

import { SignAccessPayload } from './types';

@Injectable()
export class SignGuardStrategy extends PassportStrategy(Strategy) {
  constructor(cookieService: CookieService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => cookieService.get(request, CookieKey.Access)]),
      secretOrKey: new JwtConfig().getSecret(),
      ignoreExpiration: false,
    });
  }

  validate(payload: SignAccessPayload): SignAccessPayload {
    if (!payload?.id) {
      throw new InvalidJwtTokenException();
    }

    return payload;
  }
}
