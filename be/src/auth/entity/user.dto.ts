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
import 'reflect-metadata';

export class UserCreateDTO {
  @IsEmpty()
  notifications: Notifications[];

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Họ không được để trống' })
  firstName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  lastName: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự' })
  @MaxLength(32, {
    message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự',
  })
  password: string;

  @IsEnum(UserRole, {
    message: 'Vai trò phải là quản lý, thành viên hoặc đầu bếp',
  })
  role: UserRole;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsNotEmpty({ message: 'Ngày sinh nhật không được để trống' })
  dob: string;
}
export class UserUpdateDTO {
  @IsEmpty()
  notifications: Notifications[];

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Họ không được để trống' })
  firstName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  lastName: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự' })
  @MaxLength(32, {
    message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự',
  })
  password: string;

  @IsEnum(UserRole, {
    message: 'Vai trò phải là quản lý, thành viên hoặc đầu bếp',
  })
  role: UserRole;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsNotEmpty({ message: 'Ngày sinh nhật không được để trống' })
  dob: string;
}

export class UserLoginDTO {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự' })
  @MaxLength(32, {
    message: 'Password phải nằm trong khoảng từ 6 đến 32 ký tự',
  })
  password: string;
}
