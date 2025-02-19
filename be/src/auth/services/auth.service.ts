import { Injectable } from '@nestjs/common';
import { UserRepository } from '../storage/user.repository';
import { UserCreateDTO } from '../entity/user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
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
}
