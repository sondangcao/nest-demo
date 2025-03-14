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
}
