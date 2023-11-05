import { VerifyErrors } from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';

import { JwtConfig, User } from '@server/common';

import { SignAccessPayload, SignRefreshPayload } from './types';

export class SignService {
  private readonly jwtConfig = new JwtConfig();
  private readonly jwtService = new JwtService(this.jwtConfig.getJwtModuleOptions());

  public verify<Payload = SignAccessPayload | SignRefreshPayload>(
    token: string,
    ignoreExpiration = false,
  ): [boolean, Payload | null, VerifyErrors | null] {
    const secret = this.jwtConfig.getSecret();

    let ok: boolean;
    let payload: Payload = null;
    let error: VerifyErrors = null;

    try {
      payload = this.jwtService.verify(token, {
        secret,
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
    const secret = this.jwtConfig.getSecret();
    const payload: SignAccessPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload, { secret, expiresIn: '1h' });
  }

  public issueRefresh(user: User | SignRefreshPayload): string {
    const secret = this.jwtConfig.getSecret();
    const payload: SignRefreshPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload, { secret, expiresIn: '14d' });
  }
}
