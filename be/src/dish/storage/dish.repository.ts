import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../entity/dish.entity';
import { Repository } from 'typeorm';
import { DishCreateDTO, DishUpdateDTO } from '../entity/dish.dto';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createDishDTO: DishCreateDTO, id: number): Promise<Dish> {
    const user = await this.userRepository.findOne({ where: { id } });
    const existDish = await this.dishRepository.findOne({
      where: { name: createDishDTO.name },
    });
    if (existDish) {
      throw new Error('Dish already exists');
    }
    const newData = { ...createDishDTO, created_by: user?.id };
    const newDish = this.dishRepository.create(newData);
    return this.dishRepository.save(newDish);
  }

  async update(updateDishDTO: DishUpdateDTO, id: number): Promise<Dish> {
    const existDish = await this.dishRepository.findOne({
      where: { id: id },
    });
    if (!existDish) {
      throw new Error('Dish is not exist');
    }
    const parseData = {
      ...updateDishDTO,
      ingredient: JSON.stringify(updateDishDTO.ingredient),
    };
    Object.assign(existDish, parseData);
    return this.dishRepository.save(existDish);
  }

  async delete(id: number): Promise<boolean> {
    const existDish = await this.dishRepository.findOne({
      where: { id: id },
    });
    if (!existDish) {
      throw new Error('Dish is not exist');
    }
    await this.dishRepository
      .createQueryBuilder()
      .delete()
      .from(Dish)
      .where('id = :id', { id })
      .execute();
    return true;
  }

  async list(): Promise<{
    data: any;
  }> {
    const result = await this.dishRepository.find();
    const newResult = result.map((item) => ({
      ...item,
      ingredient: item.ingredient
        .replace(/"/g, '')
        .split(',')
        .map((i) => i.trim()),
    }));
    return {
      data: newResult,
    };
  }

  async getDEtail(id: number): Promise<Dish> {
    const existDish = await this.dishRepository.findOne({
      where: { id: id },
    });
    if (!existDish) {
      throw new Error('Dish is not exist');
    }
    return existDish;
  }
}
