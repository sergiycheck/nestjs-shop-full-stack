import { PostResolver } from './../user-posts/resolvers/post.resolver';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/user.resolver';
import { PostsService } from './services/posts.service';
import RedisPubSubConnectionProvider from './subscription';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post])],
  providers: [
    UsersResolver,
    UsersService,
    PostResolver,
    PostsService,
    ConfigService,
    RedisPubSubConnectionProvider,
  ],
})
export class UserPostsModule {}

//GraphQL argument decorators
// @Root() and @Parent()        root/parent
// @Context(param?: string)	    context / context[param]
// @Info(param?: string)	      info / info[param]
// @Args(param?: string)	      args / args[param]
