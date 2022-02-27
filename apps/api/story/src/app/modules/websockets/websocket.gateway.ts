import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway(3079)
export class WebsocketGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
{
  constructor(
    private websocketService: WebsocketService
  ) {}

  @WebSocketServer() server;
  users: number = 0;

  afterInit(server: Server) {
    this.websocketService.socket = server;
  }

  async handleConnection() {
    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('stats')
  async onChat(client, message) {
    client.broadcast.emit('stats', message);
  }
}
