import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../storage/user.repository';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async getDetail(id: number): Promise<{ user: User }> {
    return this.profileRepo.getDetail(id);
  }

  async banUser(status: number, id: number): Promise<boolean> {
    return this.profileRepo.banUser(status, id);
  }

  async listWithPanigation(page: number, pageSize: number): Promise<any> {
    return this.profileRepo.listWithPagination(page, pageSize);
  }
}
