import { IsNotEmpty } from 'class-validator';

export class DishCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ingredient: string;

  @IsNotEmpty()
  description: string;
}

export class DishUpdateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ingredient: string;

  @IsNotEmpty()
  description: string;
}
