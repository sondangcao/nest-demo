import { Injectable } from '@nestjs/common';
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
      throw new Error('Email already not exists');
    }

    const isPasswordValid = await bcrypt.compare(
      passwordBody,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: existingUser.id, username: existingUser.role };

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
    return await this.userRepository.update(
      { email },
      { otp: otp, otp_expiry: expiryDate },
    );
  }
}
