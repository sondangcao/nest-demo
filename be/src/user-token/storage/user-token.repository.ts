import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from '../entity/user-token.entity';
import { Repository } from 'typeorm';
import { SaveTokenDTO } from '../entity/user-token.dto';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class UserTokenRepository {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async saveToken(saveTokenDTO: SaveTokenDTO): Promise<boolean> {
    console.log('saveTokenDTO.userId', saveTokenDTO.userId);
    const user = await this.userRepo.findOne({
      where: { id: saveTokenDTO.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const existingToken = await this.userTokenRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (existingToken) {
      const newData = { ...existingToken, tokens: saveTokenDTO.tokens };
      Object.assign(existingToken, newData);
      await this.userTokenRepository.save(existingToken);
    } else {
      const newToken = this.userTokenRepository.create({
        user,
        token: saveTokenDTO.tokens,
      });
      await this.userTokenRepository.save(newToken);
    }

    return true;
  }

  async removeToken(userId: number): Promise<boolean> {
    await this.userTokenRepository
      .createQueryBuilder()
      .delete()
      .from(UserToken)
      .where('id: :id', { userId })
      .execute();
    return true;
  }

  async getAllTokens(): Promise<string[]> {
    const tokens = await this.userTokenRepository.find({ select: ['token'] });
    return tokens.map((t) => t.token);
  }
}
