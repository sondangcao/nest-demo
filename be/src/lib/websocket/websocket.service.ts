/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly redisService: RedisService) {}

  afterInit() {
    console.log('✅ WebSocket Server is running...');
    this.redisService.subscribe('notifications', (message) => {
      console.log('📥 WebSocket received Redis message:', message);
      this.server.emit('notifications', message);
    });
  }

  handleConnection(client: Socket) {
    console.log('🔗 Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('❌ Client disconnected:', client.id);
  }
}
