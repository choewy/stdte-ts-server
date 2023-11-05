import { CookieOptions, Request, Response } from 'express';

import { Injectable } from '@nestjs/common';
import { CookieKey } from '@server/common';

@Injectable()
export class CookieService {
  private readonly cookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  public get(request: Request, key: CookieKey): string | null {
    return request.cookies?.[key] ?? null;
  }

  public set(response: Response, key: CookieKey, value: string): void {
    response.cookie(key, value, this.cookieOptions);
  }

  public delete(response: Response, key: CookieKey): void {
    response.clearCookie(key, this.cookieOptions);
  }
}
