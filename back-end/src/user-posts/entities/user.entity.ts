import { BaseEntity } from '../../common/entities/base.abst-entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
