import { Module } from '@nestjs/common';
import { ProfileController } from './business/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { ProfileService } from './services/user.service';
import { ProfileRepository } from './storage/user.repository';
import { CloudinaryService } from 'src/lib/cloudinary';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    CloudinaryService,
    ConfigService,
  ],
  exports: [ProfileService, ProfileRepository],
})
export class UserModule {}
