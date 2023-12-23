import cookie from 'cookie';

import { IncomingMessage } from 'http';
import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TimeRecordIdProperty } from '@entity';
import { TimeRecordEvent } from '@server/common';
import { CookieKey, JwtService, JwtTokenType } from '@server/core';
import { CorsConfig } from '@server/config';

import { TimeRecordGatewayEvent } from './enums';
import { TimeRecordRowDto } from './dto';

@WebSocketGateway({
  namespace: 'timerecord',
  transports: ['websocket'],
  allowRequest: (req: IncomingMessage, func) => {
    const pass = new CorsConfig().checkOrigin(req.headers.origin ?? '');

    func(null, pass);
  },
})
export class TimeRecordGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Namespace;
  private readonly jwtService = new JwtService();

  private generateRoom(id: number) {
    return ['timerecord', id].join(':');
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

  @OnEvent(TimeRecordEvent.Upsert)
  onUpsertTimeRecord(userId: number, payload: TimeRecordRowDto) {
    this.server.in(this.generateRoom(userId)).emit(TimeRecordGatewayEvent.Upsert, payload);
  }

  @OnEvent(TimeRecordEvent.Delete)
  onDeleteTimeRecord(userId: number, payload: TimeRecordIdProperty) {
    this.server.in(this.generateRoom(userId)).emit(TimeRecordGatewayEvent.Delete, payload);
  }
}
