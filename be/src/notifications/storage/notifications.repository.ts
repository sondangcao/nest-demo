import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications, TYPE } from '../entity/notifications.entity';

interface notifications {
  userId: number;
  partyId: number;
  type: TYPE;
  message: string;
}

@Injectable()
export class NotiRepository {
  constructor(
    @InjectRepository(Notifications)
    private readonly notiRepository: Repository<Notifications>,
  ) {}

  async saveNotification(notifications: notifications[]): Promise<any> {
    const data = notifications.map((noti) => ({
      user: { id: noti.userId },
      type: noti.type,
      message: noti.message,
      partyId: noti.partyId,
    }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.notiRepository.save(data);
  }
}
