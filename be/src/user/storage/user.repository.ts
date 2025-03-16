import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDTO } from 'src/auth/entity/user.dto';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(User)
    private readonly profileRepository: Repository<User>,
  ) {}

  async getDetail(id: number): Promise<{ user: User }> {
    const existingUser = await this.profileRepository.findOne({
      where: { id: id },
    });

    if (!existingUser) {
      throw Error('You do not have permission to view other people profile');
    }
    return { user: existingUser };
  }

  async updateProfile(
    id: number,
    updateProfileDTO: UserUpdateDTO,
  ): Promise<User> {
    const existingUser = await this.profileRepository.findOne({
      where: { id: id },
    });

    if (!existingUser) {
      throw Error('You do not have permission to update other people profile');
    }
    Object.assign(existingUser, updateProfileDTO);
    return this.profileRepository.save(existingUser);
  }

  async banUser(status: number, id: number): Promise<boolean> {
    await this.profileRepository.update({ id }, { status: status });
    return true;
  }

  async listWithPagination(page: number, pageSize: number): Promise<any> {
    const [result, total] = await this.profileRepository
      .createQueryBuilder()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      data: result,
      count: total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: +page,
    };
  }

  async uploadAvatar(id: number, avatarUrl: string): Promise<any> {
    return this.profileRepository.update({ id }, { avatar: avatarUrl });
  }
}
