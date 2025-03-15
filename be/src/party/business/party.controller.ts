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
  ): Promise<Parties> {
    const user = req.headers['authorization'];
    const decoded = await this.jwtService.verifyAsync(user.split(' ')[1], {
      secret: jwtConstants.secret,
    });
    return this.partiesService.create(createPartiesDTO, +decoded.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async list(): Promise<{ parties: Parties[] }> {
    return await this.partiesService.list();
  }
}
