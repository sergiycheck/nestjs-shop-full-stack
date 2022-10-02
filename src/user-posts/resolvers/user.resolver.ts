import {
  CreateUserInput,
  UpdateUserInput,
  GetPaginatedInput,
} from 'src/graphql';
import { PostsService } from './../services/posts.service';
import { User } from './../../graphql';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import GetUserArgs from '../dtos/get-user.args';
import { UsersService } from './../services/users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query('userById')
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id, 'user');
  }

  @Query('users')
  async getAllUsers(@Args('input') input: GetPaginatedInput) {
    return this.usersService.findAll(input);
  }

  @Query('getUsersByFirstAndLast')
  async getUsersByArgs(@Args() args: GetUserArgs) {
    return this.usersService.getUsersByArgs(args);
  }

  @ResolveField('posts')
  async getPostsByUser(@Parent() user: User) {
    const { id } = user;
    return this.postsService.findAllByUser({ userId: id });
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation()
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.update(input, 'user');
  }

  @Mutation()
  async deleteUser(@Args('userId') userId: number) {
    return this.usersService.delete(userId);
  }
}
