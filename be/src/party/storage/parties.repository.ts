import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Parties } from '../entity/parties.entity';
import { PartiesCreateDTO } from '../entity/parties.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class PartiesRepository {
  constructor(
    @InjectRepository(Parties)
    private readonly partiesRepository: Repository<Parties>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createPartiesDTO: PartiesCreateDTO,
    id: number,
  ): Promise<Parties> {
    const user = await this.userRepository.findOne({ where: { id } });
    const newData = { ...createPartiesDTO, createdBy: user?.id };
    return await this.partiesRepository.save(newData);
  }
}
