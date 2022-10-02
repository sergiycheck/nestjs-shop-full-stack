import { BaseEntity } from '../../common/entities/base.abst-entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  votes: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
