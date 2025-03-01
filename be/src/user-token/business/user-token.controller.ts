import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserTokenService } from '../services/user-token.service';
import { SaveTokenDTO } from '../entity/user-token.dto';

@Controller('user-token')
export class UserTokenController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @HttpCode(HttpStatus.OK)
  @Post('save')
  async saveToken(@Body() saveTokenReq: SaveTokenDTO): Promise<any> {
    return await this.userTokenService.saveToken(saveTokenReq);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  async removeToken(userId: number) {
    await this.userTokenService.removeToken(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getAll(): Promise<string[]> {
    return await this.userTokenService.getTokens();
  }
}
