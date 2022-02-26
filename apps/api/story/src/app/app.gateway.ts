import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(3079)
export class AppGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer() server;
  users: number = 0;

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

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}
