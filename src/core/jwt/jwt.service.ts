import { TokenExpiredError, sign, verify } from 'jsonwebtoken';

import { JwtConfig, SystemConfig } from '@server/config';

import { JwtTokenType } from './enums';
import { JwtTokenPayload, JwtVerifyResult } from './types';

export class JwtService {
  private readonly systemConfig = new SystemConfig();
  private readonly jwtConfig = new JwtConfig();

  private createSubText(type: JwtTokenType, ...args: string[]) {
    return ['stdte-ts', this.systemConfig.getNodeEnv(), type, ...args].join(':');
  }

  private getExpiresIn(type: JwtTokenType) {
    switch (type) {
      case JwtTokenType.Access:
        return '1d';

      case JwtTokenType.Refresh:
        return '14d';
    }
  }

  issue(type: JwtTokenType, payload: Pick<JwtTokenPayload, 'id'>) {
    return sign({ id: payload.id }, this.jwtConfig.getSecret(), {
      issuer: this.createSubText(type, 'issuer'),
      audience: this.createSubText(type, 'audience'),
      subject: this.createSubText(type, 'token'),
      expiresIn: this.getExpiresIn(type),
    });
  }

  verify(type: JwtTokenType, token: string) {
    const result: JwtVerifyResult = {
      payload: null,
      expired: false,
      error: null,
    };

    try {
      result.payload = verify(token, this.jwtConfig.getSecret(), {
        issuer: this.createSubText(type, 'issuer'),
        audience: this.createSubText(type, 'audience'),
        subject: this.createSubText(type, 'token'),
      }) as JwtTokenPayload;
    } catch (e) {
      result.error = e;
      result.expired = e.name === TokenExpiredError.name;
    }

    return result;
  }
}
