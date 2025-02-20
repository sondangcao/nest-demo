/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../storage/user.repository';
import { UserCreateDTO } from '../entity/user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter;

  constructor(private userRepository: UserRepository) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dangson06121998@gmail.com',
        pass: 'lgnw offg mfzu qofp',
      },
    });
  }
  async register(createUserDto: UserCreateDTO): Promise<User> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = { ...createUserDto, password: hashedPassword };
    return this.userRepository.register(newUser);
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    return this.userRepository.login(email, password);
  }

  async sendMail(
    email: string,
    otp: string,
    expiryMinus: number,
    to: string,
  ): Promise<any> {
    await this.transporter.sendMail({
      from: 'dangson06121998@gmail.com',
      to,
      subject: 'Your Verification Code',
      html: `<h1>Your code: ${otp}</h1>`,
    });
    this.transporter.close();
    return await this.userRepository.sendMail(email, otp, expiryMinus);
  }

  async verifyOTP(email: string, otp: string): Promise<any> {
    return await this.userRepository.verifyOTP(email, otp);
  }

  async changePassword(email: string, newPassword: string): Promise<any> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return await this.userRepository.changePassword(email, hashedPassword);
  }
}
