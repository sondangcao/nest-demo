import { Module } from '@nestjs/common';
import { DishService } from './services/dish.service';
import { DishRepository } from './storage/dish.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entity/dish.entity';
import { DishController } from './business/dish.controller';
import { UserRepository } from 'src/auth/storage/user.repository';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, User])],
  controllers: [DishController],
  providers: [DishService, DishRepository, UserRepository],
  exports: [DishService],
})
export class DishModule {}
