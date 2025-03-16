/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from '../services/user.service';
import { User } from 'src/auth/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth';
import { InternalServerException } from 'src/exceptions/internalServer.exception';
import { CloudinaryService } from '../../lib/cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly cloudinaryService: CloudinaryService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getDetail(@Request() req: Request): Promise<{ user: User }> {
    const auth = req.headers['authorization'];
    const decoded = await this.jwtService.verifyAsync(auth.split(' ')[1], {
      secret: jwtConstants.secret,
    });
    return this.profileService.getDetail(+decoded.sub);
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

  @HttpCode(HttpStatus.OK)
  @Post('upload-avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('Cập nhật avatar không thành công');
    }
    const avatarUrl = await this.cloudinaryService.uploadFileImage(file);
    await this.profileService.uploadAvatar(userId, avatarUrl);
    return { avatarUrl };
  }
}
