import { Module } from '@nestjs/common';
import { Parties } from './entity/parties.entity';
import { User } from 'src/auth/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyController } from './business/party.controller';
import { PartiesRepository } from './storage/parties.repository';
import { PartyService } from './services/party.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UserTokenModule } from 'src/user-token/user-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parties, User]),
    NotificationsModule,
    UserTokenModule,
  ],
  controllers: [PartyController],
  providers: [PartiesRepository, PartyService],
  exports: [PartyService],
})
export class PartyModule {}
