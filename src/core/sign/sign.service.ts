import { VerifyErrors } from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtConfig, User } from '@server/common';

import { SignAccessPayload, SignRefreshPayload } from './types';

@Injectable()
export class SignService {
  private readonly jwtConfig = new JwtConfig();

  constructor(private readonly jwtService: JwtService) {}

  public verify<Payload = SignAccessPayload | SignRefreshPayload>(
    token: string,
  ): [boolean, Payload | null, VerifyErrors | null] {
    let ok: boolean;
    let payload: Payload = null;
    let error: VerifyErrors = null;

    try {
      payload = this.jwtService.verify(token) as Payload;
      ok = true;
    } catch (e) {
      error = e;
      ok = false;
    }

    return [ok, payload, error];
  }

  public issueAccess(user: User): string {
    const secret = this.jwtConfig.getSecret();
    const payload: SignAccessPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload, { secret, expiresIn: '1d' });
  }

  public issueRefresh(user: User): string {
    const secret = this.jwtConfig.getSecret();
    const payload: SignRefreshPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload, { secret, expiresIn: '14d' });
  }
}
