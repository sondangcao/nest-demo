import { IsNotEmpty, IsEmpty } from 'class-validator';

export class PartiesCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  eventDate: string;

  @IsEmpty()
  createdBy: number;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;
}

export class PartiesUpdateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  eventDate: string;

  @IsNotEmpty()
  createdBy: number;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;
}
