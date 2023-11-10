import { Response } from 'express';
import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CookieKey, HttpRequest, InvalidJwtTokenException } from '@server/common';
import { SignAccessPayload, SignRefreshPayload, SignService } from '@server/core/sign';
import { CookieService } from '@server/core/cookie';

@Injectable()
export class SignGuard extends AuthGuard('jwt') {
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
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<Response>();

    const cookieService = new CookieService();

    if (error) {
      if (error.name === TokenExpiredError.name) {
        payload = this.refreshTokens(request, response, cookieService);
      }
    }

    if (!payload) {
      cookieService.delete(response, CookieKey.Access);
      cookieService.delete(response, CookieKey.Refresh);

      throw new InvalidJwtTokenException(error);
    }

    request.userId = payload.id;
    request.userEmail = payload.email;
    request.userName = payload.name;

    return payload as Payload;
  }

  private refreshTokens(
    request: HttpRequest,
    response: Response,
    cookieService: CookieService,
  ): SignAccessPayload | false {
    const signService = new SignService();

    const accessToken = cookieService.get(request, CookieKey.Access);
    const [accessOk, accessPayload] = signService.verify<SignAccessPayload>(accessToken, true);

    const refreshToken = cookieService.get(request, CookieKey.Refresh);
    const [refreshOK, refreshPayload] = signService.verify<SignRefreshPayload>(refreshToken);

    if (
      accessOk === false ||
      refreshOK === false ||
      accessPayload?.id === undefined ||
      refreshPayload?.id === undefined ||
      accessPayload.id !== refreshPayload.id
    ) {
      return false;
    }

    cookieService.set(response, CookieKey.Access, signService.issueAccess(accessPayload));
    cookieService.set(response, CookieKey.Refresh, signService.issueRefresh(accessPayload));

    return accessPayload;
  }
}
