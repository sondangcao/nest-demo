import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './entity/notifications.entity';
import { User } from 'src/auth/entity/user.entity';
import { RedisService } from 'src/lib/redis/redis.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationGateway } from 'src/lib/websocket/websocket.service';
import { NotificationsController } from './business/notifications.controller';
import { UserRepository } from 'src/auth/storage/user.repository';
import { NotiRepository } from './storage/notifications.repository';
import { UserToken } from 'src/user-token/entity/user-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notifications, UserToken])],
  controllers: [NotificationsController],
  providers: [
    NotiRepository,
    NotificationsService,
    RedisService,
    NotificationGateway,
    UserRepository,
    FirebaseService,
  ],
  exports: [NotificationsService, NotiRepository],
})
export class NotificationsModule {}
