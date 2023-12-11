import cookie from 'cookie';

import { IncomingMessage } from 'http';
import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TimeMemoIdProperty } from '@entity';
import { TimeMemoEvent } from '@server/common';
import { CookieKey, JwtService, JwtTokenType } from '@server/core';
import { CorsConfig } from '@server/config';

import { TimeMemoGatewayEvent } from './enums';
import { TimeMemoDto } from './dto';

@WebSocketGateway({
  namespace: 'timememo',
  transports: ['websocket'],
  allowRequest: (req: IncomingMessage, func) => {
    const pass = new CorsConfig().checkOrigin(req.headers.origin ?? '');

    func(null, pass);
  },
})
export class TimeMemoGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Namespace;
  private readonly jwtService = new JwtService();

  private generateRoom(id: number) {
    return ['taskmemo', id].join(':');
  }

  async handleConnection(client: Socket) {
    const cookies = cookie.parse(client.handshake.headers.cookie ?? '');
    const result = this.jwtService.verify(JwtTokenType.Access, cookies[CookieKey.Access]);

    if (result.payload == null) {
      client.disconnect();
      return;
    }

    const id = Number(client.handshake.query.id);

    if (Number.isNaN(id)) {
      client.disconnect();
      return;
    }

    await client.join(this.generateRoom(id));
  }

  @OnEvent(TimeMemoEvent.Update)
  onUpdateTimeMemo(id: number, dto: TimeMemoDto) {
    this.server.in(this.generateRoom(id)).emit(TimeMemoGatewayEvent.Update, dto);
  }

  @OnEvent(TimeMemoEvent.Delete)
  onDeleteTimeMemo(id: number, dto: TimeMemoIdProperty) {
    this.server.in(this.generateRoom(id)).emit(TimeMemoGatewayEvent.Delete, dto);
  }
}
