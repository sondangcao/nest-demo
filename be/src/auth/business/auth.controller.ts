import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCreateDTO, UserLoginDTO } from '../entity/user.dto';
import { User } from '../entity/user.entity';
import { Public } from '../../constants/auth';
import { InternalServerException } from '../../exceptions/internalServer.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserDTO: UserCreateDTO): Promise<User> {
    try {
      return await this.authService.register(createUserDTO);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerException();
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    try {
      const { email, password } = userLoginDTO;
      await this.authService.login(email, password);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerException();
    }
  }

  @Get('profile')
  getProfile(@Request() req: User) {
    return req.email;
  }
}
