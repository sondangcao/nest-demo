import { Module } from '@nestjs/common';
import { Parties } from './entity/parties.entity';
import { User } from 'src/auth/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyController } from './business/party.controller';
import { PartiesRepository } from './storage/parties.repository';
import { PartyService } from './services/party.service';
import { RedisService } from 'src/lib/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parties, User])],
  controllers: [PartyController],
  providers: [PartiesRepository, PartyService, RedisService],
  exports: [PartyService],
})
export class PartyModule {}
