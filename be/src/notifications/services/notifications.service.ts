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

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notiRepository: NotiRepository,
    private readonly redisService: RedisService,
    private readonly firebaseService: FirebaseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNotification(party: Parties, userFCM: string[]) {
    const users = await this.userRepository.find();
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

    for (const token of userFCM) {
      for (const notiId of listNoti) {
        await this.firebaseService.sendNotification(
          token,
          notiId ? +notiId?.id : 0,
          `${party.name}`,
          `${party.description}`,
        );
      }
    }
  }
}
