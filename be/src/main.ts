import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NotificationGateway } from './lib/websocket/websocket.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({ origin: '*' });
  app.get(NotificationGateway);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
