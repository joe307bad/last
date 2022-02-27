import { Module, Global } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  imports: [WebsocketGateway],
  controllers: [],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
