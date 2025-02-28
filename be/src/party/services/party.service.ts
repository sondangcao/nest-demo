import { Injectable } from '@nestjs/common';
import { PartiesRepository } from '../storage/parties.repository';
import { PartiesCreateDTO } from '../entity/parties.dto';
import { Parties } from '../entity/parties.entity';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Injectable()
export class PartyService {
  constructor(
    private readonly partiesRepository: PartiesRepository,
    private readonly notiService: NotificationsService,
  ) {}

  async create(
    createPartiesDTO: PartiesCreateDTO,
    id: number,
    userFCM: string[],
  ): Promise<Parties> {
    const party = await this.partiesRepository.create(createPartiesDTO, id);
    await this.notiService.createNotification(party, userFCM);
    return party;
  }
}
