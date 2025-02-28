import { IsEnum, IsNotEmpty } from 'class-validator';
import { TYPE } from './notifications.entity';

export class CreateNotiDTO {
  @IsNotEmpty()
  userId: number;

  @IsEnum(TYPE, { message: 'Role must be new_party or other' })
  type: TYPE;

  @IsNotEmpty()
  partyId: number;

  @IsNotEmpty()
  message: string;
}
