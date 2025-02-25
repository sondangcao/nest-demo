import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'ingredient', type: 'text', nullable: false })
  ingredient: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'created_by', nullable: true })
  created_by: number;

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
