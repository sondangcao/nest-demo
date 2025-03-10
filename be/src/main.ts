import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NotificationGateway } from './lib/websocket/websocket.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  app.get(NotificationGateway);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log(JSON.stringify(errors, null, 2));
        return new BadRequestException(
          errors.map((err) => ({
            field: err.property,
            message: Object.values(err.constraints || {}).join(', '),
          })),
        );
      },
    }),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
