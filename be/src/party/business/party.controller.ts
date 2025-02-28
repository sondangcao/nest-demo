/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { PartyService } from '../services/party.service';
import { PartiesCreateDTO } from '../entity/parties.dto';
import { Parties } from '../entity/parties.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth';

@Controller('party')
export class PartyController {
  constructor(
    private readonly partiesService: PartyService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createPartiesDTO: PartiesCreateDTO,
    @Request() req: Request,
    userFCM: string[],
  ): Promise<Parties> {
    const user = req.headers['authorization'];
    const decoded = await this.jwtService.verifyAsync(user.split(' ')[1], {
      secret: jwtConstants.secret,
    });
    return this.partiesService.create(createPartiesDTO, +decoded.sub, userFCM);
  }
}
