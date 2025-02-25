import { Module } from '@nestjs/common';
import { AuthController } from './business/auth.controller';
import { AuthService } from './services/auth.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './storage/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
