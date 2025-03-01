import { Module } from '@nestjs/common';
import { UserToken } from './entity/user-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenController } from './business/user-token.controller';
import { UserTokenRepository } from './storage/user-token.repository';
import { UserTokenService } from './services/user-token.service';
import { User } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/storage/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken, User])],
  controllers: [UserTokenController],
  providers: [UserTokenRepository, UserTokenService, UserRepository],
  exports: [UserTokenService, UserTokenRepository],
})
export class UserTokenModule {}
