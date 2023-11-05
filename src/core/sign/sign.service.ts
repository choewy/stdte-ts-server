import { VerifyErrors } from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';

import { JwtConfig, User } from '@server/common';

import { SignAccessPayload, SignRefreshPayload } from './types';

export class SignService {
  public verify<Payload = SignAccessPayload | SignRefreshPayload>(
    token: string,
    ignoreExpiration = false,
  ): [boolean, Payload | null, VerifyErrors | null] {
    let ok: boolean;
    let payload: Payload = null;
    let error: VerifyErrors = null;

    try {
      const jwtConfig = new JwtConfig();
      const jwtServiceOptions = jwtConfig.getJwtModuleOptions();
      const jwtService = new JwtService(jwtServiceOptions);

      payload = jwtService.verify(token, {
        ignoreExpiration,
      }) as Payload;
      ok = true;
    } catch (e) {
      error = e;
      ok = false;
    }

    return [ok, payload, error];
  }

  public issueAccess(user: User | SignAccessPayload): string {
    const secret = new JwtConfig().getSecret();
    const payload: SignAccessPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtConfig = new JwtConfig();
    const jwtServiceOptions = jwtConfig.getJwtModuleOptions();
    const jwtService = new JwtService(jwtServiceOptions);

    return jwtService.sign(payload, { secret, expiresIn: '1h' });
  }

  public issueRefresh(user: User | SignRefreshPayload): string {
    const secret = new JwtConfig().getSecret();
    const payload: SignRefreshPayload = {
      id: user.id,
    };

    const jwtConfig = new JwtConfig();
    const jwtServiceOptions = jwtConfig.getJwtModuleOptions();
    const jwtService = new JwtService(jwtServiceOptions);

    return jwtService.sign(payload, { secret, expiresIn: '14d' });
  }
}
