import cookie from 'cookie';

import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

import { CorsConfig } from '@server/config';

export class Gateway {
  static allowRequest(req: IncomingMessage, func: (err: string | null | undefined, success: boolean) => void) {
    const pass = new CorsConfig().checkOrigin(req.headers.origin ?? '');

    if (pass) {
      func(null, true);
    } else {
      func('CORS error', false);
    }
  }

  static parseCookies(client: Socket) {
    return cookie.parse(client.handshake.headers.cookie ?? '');
  }
}
