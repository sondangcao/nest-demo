import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  CHEF = 'chef',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false, select: false })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ name: 'gender', nullable: false })
  gender: string;

  @Column({ name: 'commune', nullable: true })
  commune: string;

  @Column({ name: 'district', nullable: true })
  district: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'dob', nullable: false })
  dob: string;

  @Column({ name: 'status', nullable: false, default: 1 })
  status: number;

  @Column({ name: 'otp', nullable: true })
  otp: string;

  @Column({ name: 'otp_expiry', nullable: true })
  otp_expiry: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'group_id', nullable: true })
  group_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ name: 'updated_at', nullable: true })
  updated_at: string;
}
