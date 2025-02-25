import { IsEmpty, IsNotEmpty } from 'class-validator';

export class DishCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ingredient: string;

  @IsEmpty()
  description: string;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;
}

export class DishUpdateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ingredient: string;

  @IsEmpty()
  description: string;
}
