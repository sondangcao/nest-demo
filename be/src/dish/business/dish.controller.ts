/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Request,
  InternalServerErrorException,
  Post,
  Put,
  Param,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { DishCreateDTO, DishUpdateDTO } from '../entity/dish.dto';
import { Dish } from '../entity/dish.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth';

@Controller('dish')
export class DishController {
  constructor(
    private readonly dishService: DishService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createDishDTO: DishCreateDTO,
    @Request() req: Request,
  ): Promise<Dish> {
    try {
      const auth = req.headers['authorization'];
      const decoded = await this.jwtService.verifyAsync(auth.split(' ')[1], {
        secret: jwtConstants.secret,
      });
      const newRequest = {
        ...createDishDTO,
        ingredient: JSON.stringify(createDishDTO.ingredient),
      };
      return await this.dishService.create(newRequest, +decoded.sub);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDishDTO: DishUpdateDTO,
  ): Promise<Dish> {
    try {
      const newRequest = {
        ...updateDishDTO,
        ingredient: JSON.stringify(updateDishDTO.ingredient),
      };
      return await this.dishService.update(newRequest, id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.dishService.delete(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async listWithPagination(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    try {
      return await this.dishService.listWithPanigation(page, pageSize);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
