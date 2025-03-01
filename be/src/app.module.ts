import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard';
import { User } from './auth/entity/user.entity';
import { DishController } from './dish/business/dish.controller';
import { DishModule } from './dish/dish.module';
import { Dish } from './dish/entity/dish.entity';
import { UserModule } from './user/user.module';
import { ProfileController } from './user/business/user.controller';
import { PartyController } from './party/business/party.controller';
import { PartyModule } from './party/party.module';
import { Parties } from './party/entity/parties.entity';
import { NotificationGateway } from './lib/websocket/websocket.service';
import { RedisService } from './lib/redis/redis.service';
import { NotificationsController } from './notifications/business/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { Notifications } from './notifications/entity/notifications.entity';
import { UserTokenService } from './user-token/services/user-token.service';
import { UserTokenModule } from './user-token/user-token.module';
import { UserToken } from './user-token/entity/user-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: process.env.DB_HOST,
      // port: process.env.DP_PORT ? +process.env.DP_PORT : 21138,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASS,
      // database: process.env.DB_NAME,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dangcaoson',
      database: 'tutorial_db',
      entities: [User, Dish, Parties, Notifications, UserToken],
      synchronize: true,
    }),
    AuthModule,
    DishModule,
    UserModule,
    PartyModule,
    NotificationsModule,
    UserTokenModule,
  ],
  controllers: [
    AppController,
    DishController,
    ProfileController,
    PartyController,
    NotificationsController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    NotificationGateway,
    RedisService,
    UserTokenService,
  ],
})
export class AppModule {}
