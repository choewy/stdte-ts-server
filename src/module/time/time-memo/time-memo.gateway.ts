import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TimeMemoEvent } from '@server/common';
import { CookieKey, Gateway, JwtService, JwtTokenType } from '@server/core';

import { TimeMemoGatewayEvent } from './enums';
import { TimeMemoDto } from './dto';

@WebSocketGateway({
  namespace: 'timememo',
  transports: ['websocket'],
  allowRequest: Gateway.allowRequest,
})
export class TimeMemoGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Namespace;
  private readonly jwtService = new JwtService();

  private generateRoom(id: number) {
    return ['timememo', id].join(':');
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

  @OnEvent(TimeMemoEvent.Upsert)
  onUpsertTimeMemo(userId: number, payload: TimeMemoDto) {
    this.server.in(this.generateRoom(userId)).emit(TimeMemoGatewayEvent.Upsert, payload);
  }

  @OnEvent(TimeMemoEvent.Delete)
  onDeleteTimeMemo(userId: number, payload: Pick<TimeMemoDto, 'id'>) {
    this.server.in(this.generateRoom(userId)).emit(TimeMemoGatewayEvent.Delete, payload);
  }
}
