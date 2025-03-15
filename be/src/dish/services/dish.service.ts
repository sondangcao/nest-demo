import { Injectable } from '@nestjs/common';
import { DishRepository } from '../storage/dish.repository';
import { DishCreateDTO, DishUpdateDTO } from '../entity/dish.dto';
import { Dish } from '../entity/dish.entity';

@Injectable()
export class DishService {
  constructor(private dishRepository: DishRepository) {}

  async create(createDishDTO: DishCreateDTO, userId: number): Promise<Dish> {
    return this.dishRepository.create(createDishDTO, userId);
  }

  async update(updateDisDTO: DishUpdateDTO, id: number): Promise<Dish> {
    return this.dishRepository.update(updateDisDTO, id);
  }

  async delete(id: number): Promise<boolean> {
    return this.dishRepository.delete(id);
  }

  async list(): Promise<any> {
    return this.dishRepository.list();
  }

  async getDetail(id: number): Promise<Dish> {
    return this.dishRepository.getDEtail(id);
  }
}
