import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TimeRecordEvent } from '@server/common';
import { CookieKey, Gateway, JwtService, JwtTokenType } from '@server/core';

import { TimeRecordGatewayEvent } from './enums';
import { TimeRecordRowDto } from './dto';

@WebSocketGateway({
  namespace: 'timerecord',
  transports: ['websocket'],
  allowRequest: Gateway.allowRequest,
})
export class TimeRecordGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Namespace;
  private readonly jwtService = new JwtService();

  private generateRoom(id: number) {
    return ['timerecord', id].join(':');
  }

  async handleConnection(client: Socket) {
    const cookies = Gateway.parseCookies(client);
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
}
