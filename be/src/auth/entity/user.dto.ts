import {
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  MaxLength,
  IsEmpty,
} from 'class-validator';
import { UserRole } from './user.entity';
import { Notifications } from 'src/notifications/entity/notifications.entity';

export class UserCreateDTO {
  @IsEmpty()
  notifications: Notifications[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEnum(UserRole, { message: 'Role must be admin, user, or moderator' })
  role: UserRole;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;
}

export class UserUpdateDTO {
  @IsEmpty()
  notifications: Notifications[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEnum(UserRole, { message: 'Role must be admin, user, or moderator' })
  role: UserRole;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;
}

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}

export class SendMailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  otp_expiry: string;
}
