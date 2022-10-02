import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  constructor(attrs: any) {
    Object.assign(this, attrs);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: string;
}
