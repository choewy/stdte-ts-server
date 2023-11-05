import { Request, Response } from 'express';
import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CookieKey, InvalidJwtTokenException } from '@server/common';

import { CookieService } from '../cookie';

import { SignAccessPayload, SignRefreshPayload } from './types';
import { SignService } from './sign.service';

@Injectable()
export class SignGuard extends AuthGuard('jwt') {
  private readonly cookieService = new CookieService();
  private readonly signService = new SignService();

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<Payload extends SignAccessPayload>(
    _: null,
    result: Payload,
    error: VerifyErrors,
    context: ExecutionContext,
  ) {
    let payload = result as SignAccessPayload | false;

    const http = context.switchToHttp();
    const request = http.getRequest<Request & { userId?: number }>();
    const response = http.getResponse<Response>();

    if (error) {
      if (error.name === TokenExpiredError.name) {
        payload = this.refreshToken(request, response);
      }
    }

    if (payload === false) {
      this.cookieService.delete(response, CookieKey.Access);
      this.cookieService.delete(response, CookieKey.Refresh);

      throw new InvalidJwtTokenException(error);
    }

    request.userId = payload?.id;

    return payload as Payload;
  }

  refreshToken(request: Request, response: Response): SignAccessPayload | false {
    const accessToken = this.cookieService.get(request, CookieKey.Access);
    const [accessOk, accessPayload] = this.signService.verify<SignAccessPayload>(accessToken, true);

    const refreshToken = this.cookieService.get(request, CookieKey.Refresh);
    const [refreshOK, refreshPayload] = this.signService.verify<SignRefreshPayload>(refreshToken);

    if (
      accessOk === false ||
      refreshOK === false ||
      accessPayload?.id === undefined ||
      refreshPayload?.id === undefined ||
      accessPayload.id !== refreshPayload.id
    ) {
      return false;
    }

    this.cookieService.set(response, CookieKey.Access, this.signService.issueAccess(accessPayload));
    this.cookieService.set(response, CookieKey.Refresh, this.signService.issueRefresh(accessPayload));

    return accessPayload;
  }
}
