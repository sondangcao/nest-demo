import { IsNotEmpty } from 'class-validator';

export class SaveTokenDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  tokens: string;
}
