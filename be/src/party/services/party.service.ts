import { Injectable } from '@nestjs/common';
import { PartiesRepository } from '../storage/parties.repository';
import { PartiesCreateDTO } from '../entity/parties.dto';
import { Parties } from '../entity/parties.entity';
import { NotificationsService } from 'src/notifications/services/notifications.service';
import { UserTokenService } from 'src/user-token/services/user-token.service';

@Injectable()
export class PartyService {
  constructor(
    private readonly partiesRepository: PartiesRepository,
    private readonly notiService: NotificationsService,
    private readonly userTokenService: UserTokenService,
  ) {}

  async create(
    createPartiesDTO: PartiesCreateDTO,
    id: number,
  ): Promise<Parties> {
    const party = await this.partiesRepository.create(createPartiesDTO, id);
    const listUserTokens = await this.userTokenService.getTokens();
    await this.notiService.createNotification(party, listUserTokens);
    return party;
  }
}
