import { GetPaginatedInputExtended } from './../dtos/getPaginatedInput.args';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { REDIS_PUB_SUB } from './../constants';
import {
  CreatePostInput,
  UpdatePostInput,
  Post,
  GetPostsByUser,
} from './../../graphql';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PostsService } from '../services/posts.service';
import { UsersService } from './../services/users.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    @Inject(REDIS_PUB_SUB) private redisPubSub: RedisPubSub,
    private usersService: UsersService,
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
    resolve(this: PostResolver, value: { createdPost: Post }) {
      return value.createdPost;
    },
    filter(
      this: PostResolver,
      payload: { createdPost: Post },
      args: { input: string },
    ) {
      return payload.createdPost.title.startsWith(args.input);
    },
  })
  // payload is the payload published by redisPubSub
  // args is the arguments provided to the createdPostSubscription
  // method
  createdPostSubscription(@Args('input') _input: string) {
    return this.redisPubSub.asyncIterator('createdPost');
  }

  @Mutation()
  updatePost(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input, 'post');
  }

  @Mutation()
  async upvotePost(@Args('postId') postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }

  @Mutation()
  async deletePost(@Args('postId') postId: number) {
    return this.postsService.delete(postId);
  }

  @Query('posts')
  async getAllPosts(@Args('input') input: GetPaginatedInputExtended) {
    return this.postsService.findAll(input);
  }

  @Query()
  async postById(@Args('id') id: number) {
    return this.postsService.findOneById(id, 'post');
  }

  @ResolveField('user')
  async getUser(@Parent() post: Post) {
    const { userId } = post;
    return this.usersService.findOneById(userId, 'user');
  }

  @Query()
  postsByUserId(@Args('input') input: GetPostsByUser) {
    return this.postsService.findAllByUser(input);
  }
}
