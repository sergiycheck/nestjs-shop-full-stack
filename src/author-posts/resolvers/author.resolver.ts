import { REDIS_PUB_SUB } from './../constants';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  CreatePostInput,
  Author,
  UpdatePostInput,
  Post,
} from './../../graphql';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from './posts.service';
import GetAuthorArgs from './dtos/get-author.args';
import { Inject } from '@nestjs/common';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    @Inject(REDIS_PUB_SUB) private redisPubSub: RedisPubSub,
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Mutation()
  createPost(@Args('input') input: CreatePostInput) {
    const created = this.postsService.create(input);
    this.redisPubSub.publish('createdPost', { createdPost: created });
    return created;
  }

  @Subscription(() => Post, {
    name: 'createdPost',
    resolve(this: AuthorsResolver, value: { createdPost: Post }) {
      return value.createdPost;
    },
    filter(
      this: AuthorsResolver,
      payload: { createdPost: Post },
      args: { input: string },
    ) {
      return payload.createdPost.title.startsWith(args.input);
    },
  })
  // payload is the payload published by redisPubSub
  // args is the arguments provided to the createdPostSubscription
  // method
  createdPostSubscription(@Args('input') input: string) {
    return this.redisPubSub.asyncIterator('createdPost');
  }

  @Mutation()
  update(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input);
  }

  @Query('allPosts')
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Query('author')
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query('getAuthorsByArgs')
  async getAuthorsByArgs(@Args() args: GetAuthorArgs) {
    return this.authorsService.getAuthorsByArgs(args);
  }

  @ResolveField('posts')
  async getPostsByAuthor(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor({ authorId: id });
  }

  @Mutation()
  async upvotePost(@Args('postId') postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }
}
