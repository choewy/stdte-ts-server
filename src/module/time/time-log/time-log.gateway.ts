import cookie from 'cookie';

import { IncomingMessage } from 'http';
import { Namespace, Socket } from 'socket.io';

import { OnEvent } from '@nestjs/event-emitter';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { TimeLogEvent } from '@server/common';
import { CorsConfig } from '@server/config';
import { CookieKey, JwtService, JwtTokenType } from '@server/core';

import { TimeLogService } from './time-log.service';
import { TimeLogGatewayEvent } from './enums';

@WebSocketGateway({
  namespace: 'timelog',
  transports: ['websocket'],
  allowRequest: (req: IncomingMessage, func) => {
    const pass = new CorsConfig().checkOrigin(req.headers.origin ?? '');

    func(null, pass);
  },
})
export class TimeLogGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Namespace;
  private readonly jwtService = new JwtService();

  constructor(private readonly timeLogService: TimeLogService) {}

  handleConnection(client: Socket) {
    const cookies = cookie.parse(client.handshake.headers.cookie ?? '');
    const result = this.jwtService.verify(JwtTokenType.Access, cookies[CookieKey.Access]);

    if (result.payload == null) {
      client.disconnect();
    }
  }

  @OnEvent(TimeLogEvent.Update)
  onTimeLogUpdate(id: number) {
    this.timeLogService.updateLog(id).then((dto) => {
      if (dto == null) {
        return;
      }

      this.server.emit(TimeLogGatewayEvent.EmitUpdate, dto);
    });
  }
}
