import { Response } from 'express';

import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';

import { InvalidCredentialsException, Request } from '@server/common';

import { JwtService, JwtTokenType } from '../jwt';
import { CookieKey, CookieService } from '../cookie';

@Injectable({ scope: Scope.REQUEST })
export class JwtGuard implements CanActivate {
  private readonly cookieService = new CookieService();
  private readonly jwtService = new JwtService();

  private validateAccessToken(req: Request) {
    const result = this.jwtService.verify(JwtTokenType.Access, this.cookieService.get(req, CookieKey.Access));

    if (result.error && result.expired === false) {
      throw new InvalidCredentialsException(result.error);
    }

    req.userId = result.payload?.id;

    return typeof req.userId === 'number';
  }

  private validateRefreshToken(req: Request, res: Response) {
    const result = this.jwtService.verify(JwtTokenType.Refresh, this.cookieService.get(req, CookieKey.Refresh));

    if (result.payload) {
      this.cookieService.set(res, CookieKey.Access, this.jwtService.issue(JwtTokenType.Access, result.payload));
      this.cookieService.set(res, CookieKey.Refresh, this.jwtService.issue(JwtTokenType.Refresh, result.payload));

      return true;
    }

    throw new InvalidCredentialsException(result.error);
  }

  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    console.log(req.headers);

    const res = http.getResponse<Response>();

    if (this.validateAccessToken(req) === false) {
      return this.validateRefreshToken(req, res);
    }

    return true;
  }
}
