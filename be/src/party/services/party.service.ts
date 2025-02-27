import { Injectable } from '@nestjs/common';
import { PartiesRepository } from '../storage/parties.repository';
import { PartiesCreateDTO } from '../entity/parties.dto';
import { Parties } from '../entity/parties.entity';
import { RedisService } from 'src/lib/redis/redis.service';

@Injectable()
export class PartyService {
  constructor(
    private readonly redisService: RedisService,
    private readonly partiesRepository: PartiesRepository,
  ) {}

  async create(
    createPartiesDTO: PartiesCreateDTO,
    id: number,
  ): Promise<Parties> {
    const party = await this.partiesRepository.create(createPartiesDTO, id);
    await this.redisService.publish(
      'notifications',
      JSON.stringify({
        type: 'hinh_nhu_duoc_roi',
        message: `Tiệc mới: ${party.name} vào ${party.eventDate.toString()}`,
        party_id: party?.id,
      }),
    );
    return party;
  }
}
