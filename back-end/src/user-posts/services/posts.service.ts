import { Post } from './../entities/post.entity';
import { CreatePostInput, GetPostsByUser } from 'src/graphql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityService } from 'src/common/services/base-entityt.service';
import { UsersService } from './users.service';

@Injectable()
export class PostsService extends BaseEntityService<Post> {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {
    super(postsRepository);
  }

  create(createPostInput: CreatePostInput) {
    const newPost = this.postsRepository.create({
      title: createPostInput.title,
      userId: createPostInput.userId,
    });
    return this.postsRepository.save(newPost);
  }

  async findAllByUser(args: GetPostsByUser) {
    const posts = await this.postsRepository.find({
      where: { userId: args.userId },
    });

    return posts;
  }

  async delete(id: number) {
    return super.delete(id, 'user');
  }

  async upvoteById({ id }: { id: number }) {
    const post = await this.findOneById(id, 'post');

    await this.repository.update({ id }, { votes: post.votes + 1 });

    return this.findOneById(id, 'post');
  }
}
