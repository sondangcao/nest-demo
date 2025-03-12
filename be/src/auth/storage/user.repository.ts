/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO } from '../entity/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUseDTO: UserCreateDTO): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUseDTO.email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = this.userRepository.create(createUseDTO);
    return this.userRepository.save(newUser);
  }

  async login(
    email: string,
    passwordBody: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existingUser) {
      throw new BadRequestException('Tài khoản này chưa tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(
      passwordBody,
      existingUser.password,
    );

    if (!isPasswordValid && existingUser) {
      throw new BadRequestException('Email hoặc mật khẩu không chính xác');
    }

    const payload = { sub: existingUser.id, email: existingUser.email };

    const token = this.jwtService.sign(payload);

    return {
      access_token: 'Bearer ' + token,
    };
  }

  async sendMail(
    email: string,
    otp: string,
    expiryMinus: number,
  ): Promise<any> {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinus);
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!existingUser) {
      throw new BadRequestException('Tài khoản này chưa tồn tại');
    }
    return await this.userRepository.update(
      { email },
      { otp: otp, otp_expiry: expiryDate },
    );
  }

  async verifyOTP(email: string, otpInput: string): Promise<boolean> {
    const existingOTP = await this.userRepository.findOne({
      where: { email: email },
      select: ['otp', 'otp_expiry'],
    });
    if (existingOTP?.otp !== otpInput) {
      throw new BadRequestException('mã OTP bạn gửi lên không đúng');
    }
    const dateNow = new Date();
    if (dateNow > existingOTP.otp_expiry) {
      throw new BadRequestException('OTP has expired');
    }
    if (dateNow < existingOTP.otp_expiry && existingOTP.otp === otpInput) {
      await this.userRepository.update(
        { email },
        {
          // @ts-ignore
          otp: null,
          // @ts-ignore
          otp_expiry: null,
        },
      );
    }
    return true;
  }

  async changePassword(email: string, newPassword: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!existingUser) {
      throw new InternalServerErrorException('Email is not exists');
    } else {
      await this.userRepository.update({ email }, { password: newPassword });
    }
    return true;
  }
}
