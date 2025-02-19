import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SendMailDTO, UserCreateDTO, UserLoginDTO } from '../entity/user.dto';
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

  private generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async sendMail(@Body() body: { email: string }) {
    const otp = this.generateRandomCode();
    console.log('otp', otp);
    await this.authService.sendMail(body.email, otp, 10, body.email);
  }
}
