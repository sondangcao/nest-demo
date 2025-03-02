/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { NotiRepository } from '../storage/notifications.repository';
import { TYPE } from '../entity/notifications.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/lib/redis/redis.service';
import { Parties } from 'src/party/entity/parties.entity';
import { UserToken } from 'src/user-token/entity/user-token.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notiRepository: NotiRepository,
    private readonly redisService: RedisService,
    private readonly firebaseService: FirebaseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async createNotification(party: Parties) {
    const users = await this.userRepository.find();
    const usersWithToken = await this.userTokenRepository.find({
      select: ['token'],
      relations: ['user'],
    });

    const FCMMessage = usersWithToken.map((user) => ({
      userId: user.user.id,
      token: user.token,
    }));

    const userToken = new Map(FCMMessage.map((u: any) => [u.userId, u.token]));

    const notifications = users.map((user) => ({
      userId: user.id,
      message: `Tiệc mới: ${party.name} vào ${party.eventDate.toString()}`,
      partyId: party.id,
      type: TYPE.NEW_PARTY,
    }));

    const listNoti = await this.notiRepository.saveNotification(notifications);

    await this.redisService.publish('notifications', {
      type: 'NEW_PARTY',
      message: `Tiệc mới: ${party.name} vào ${party.eventDate.toString()}`,
      party_id: party.id,
    });

    for (const noti of listNoti) {
      const token = userToken.get(String(noti.user?.id));
      if (token) {
        await this.firebaseService.sendNotification(
          token,
          +noti?.id,
          +noti.user?.id,
          `${party.name}`,
          `${party.description}`,
        );
      }
    }
  }
}
