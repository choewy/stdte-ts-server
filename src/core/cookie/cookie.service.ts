import { DateTime } from 'luxon';
import { CookieOptions, Response } from 'express';

import { Request } from '@server/common';

import { CookieKey } from './enums';

export class CookieService {
  private readonly options: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  private getExpires(key: CookieKey) {
    switch (key) {
      case CookieKey.Access:
        return DateTime.local().plus({ days: 1 }).toJSDate();

      case CookieKey.Refresh:
        return DateTime.local().plus({ days: 14 }).toJSDate();
    }
  }

  get(req: Request, key: CookieKey) {
    return req.cookies?.[key] ?? null;
  }

  set(res: Response, key: CookieKey, value: string) {
    res.cookie(key, value, { expires: this.getExpires(key), ...this.options });
  }

  del(res: Response, key: CookieKey) {
    res.clearCookie(key, this.options);
  }
}
