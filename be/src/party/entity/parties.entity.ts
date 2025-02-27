import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parties {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'event_date', type: 'datetime', nullable: false })
  eventDate: Date;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
