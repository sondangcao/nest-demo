/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Query,
  Request,
} from '@nestjs/common';
import { ProfileService } from '../services/user.service';
import { User } from 'src/auth/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth';
import { InternalServerException } from 'src/exceptions/internalServer.exception';

@Controller('user')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getDetail(@Request() req: Request): Promise<User> {
    try {
      const auth = req.headers['authorization'];
      const decoded = await this.jwtService.verifyAsync(auth.split(' ')[1], {
        secret: jwtConstants.secret,
      });
      return this.profileService.getDetail(+decoded.sub);
    } catch (error) {
      console.log('error', error);
      throw new Error('Not get your profile');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch('ban/:id')
  async banUser(
    @Param('id') id: number,
    @Body() status: number,
  ): Promise<boolean> {
    try {
      return await this.profileService.banUser(status, id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async listWithPagination(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    try {
      return await this.profileService.listWithPanigation(page, pageSize);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
