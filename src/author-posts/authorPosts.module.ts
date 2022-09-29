import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthorsService } from './services/authors.service';
import { AuthorsResolver } from './resolvers/user.resolver';
import { PostsService } from './services/posts.service';
import RedisPubSubConnectionProvider from './subscription';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post])],
  providers: [
    AuthorsResolver,
    PostsService,
    AuthorsService,
    ConfigService,
    RedisPubSubConnectionProvider,
  ],
})
export class AuthorPostsModule {}

//GraphQL argument decorators
// @Root() and @Parent()        root/parent
// @Context(param?: string)	    context / context[param]
// @Info(param?: string)	      info / info[param]
// @Args(param?: string)	      args / args[param]
