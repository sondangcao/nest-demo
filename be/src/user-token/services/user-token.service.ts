import { Injectable } from '@nestjs/common';
import { UserTokenRepository } from '../storage/user-token.repository';
import { SaveTokenDTO } from '../entity/user-token.dto';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepo: UserTokenRepository) {}

  async saveToken(saveTokenReq: SaveTokenDTO): Promise<boolean> {
    await this.userTokenRepo.saveToken(saveTokenReq);
    return true;
  }
  async removeToken(userId: number): Promise<boolean> {
    await this.userTokenRepo.removeToken(userId);
    return true;
  }

  async getTokens(): Promise<string[]> {
    return await this.userTokenRepo.getAllTokens();
  }
}
