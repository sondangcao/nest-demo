import { Injectable } from '@nestjs/common';
import { UserRepository } from '../storage/user.repository';
import { UserCreateDTO } from '../entity/user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
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
    console.log('to, to', this.configService.get<string>('EMAIL_USER'));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject: 'Your Verification Code',
      html: `<h1>Your code: ${otp}</h1>`,
    });
    this.transporter.close();
    return await this.userRepository.sendMail(email, otp, expiryMinus);
  }
}
