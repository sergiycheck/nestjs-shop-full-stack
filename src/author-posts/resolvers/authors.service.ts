import { Injectable } from '@nestjs/common';
import { Author } from 'src/graphql';
import GetAuthorArgs from './dtos/get-author.args';
import { PostsService } from './posts.service';

@Injectable()
export class AuthorsService {
  authorsInMemory: Author[];
  constructor(private readonly postsService: PostsService) {
    const { posts } = postsService;
    this.authorsInMemory = [
      {
        id: 1,
        firstName: 'first 1',
        lastName: 'last 1',
        posts: [posts[0], posts[1]],
      },
      {
        id: 2,
        firstName: 'name 2',
        lastName: 'last 2',
        posts: [posts[2]],
      },
    ];
  }
  findOneById(id: number) {
    return this.authorsInMemory.find((a) => a.id == id);
  }

  getAuthorsByArgs(args: GetAuthorArgs) {
    return this.authorsInMemory.filter(
      (a) =>
        a.firstName.startsWith(args.firstName) ||
        a.lastName.startsWith(args.lastName),
    );
  }
}
