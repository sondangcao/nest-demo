import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TYPE {
  NEW_PARTY = 'new_party',
  OTHER = 'other',
}

@Entity('notifications')
export class Notifications {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'party_id', nullable: false })
  partyId: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: TYPE,
    nullable: false,
    default: TYPE.NEW_PARTY,
  })
  type: TYPE.NEW_PARTY;

  @Column({ name: 'message', nullable: false })
  message: string;

  @Column({ name: 'is_read', nullable: false, default: false })
  is_read: boolean;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
