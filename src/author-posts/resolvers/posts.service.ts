import { CreatePostInput, Post, UpdatePostInput } from './../../graphql';
import { Injectable, NotFoundException } from '@nestjs/common';

type FindAllParams = {
  authorId?: number;
};

@Injectable()
export class PostsService {
  public posts: Post[];
  constructor() {
    this.posts = [
      {
        id: 1,
        title: 'post title 1',
        votes: 3,
        authorId: 1,
      },
      {
        id: 2,
        title: 'post title 2',
        votes: 5,
        authorId: 1,
      },
      {
        id: 3,
        title: 'post title 3',
        votes: 1,
        authorId: 2,
      },
    ];
  }

  create(createPostInput: CreatePostInput) {
    const { posts } = this;
    const post: Post = {
      ...createPostInput,
      id: posts[posts.length - 1].id + 1,
      votes: 0,
    };
    posts.push(post);
    return post;
  }

  findAll() {
    return this.posts;
  }

  findAllByAuthor(params?: FindAllParams) {
    const { posts } = this;
    if (params?.authorId)
      return posts.filter((p) => p.authorId === params.authorId);
    return posts;
  }
  findOne(id: number) {
    const p = this.posts.find((p) => p.id === id);
    if (!p) throw new NotFoundException(`post with id ${id} was not found`);
    return p;
  }
  update(update: UpdatePostInput) {
    const p = this.findOne(update.id);
    this.posts[p.id] = {
      ...p,
      ...update,
    };

    return this.posts[p.id];
  }
  remove(id: number) {
    const p = this.findOne(id);
    this.posts.splice(this.posts.indexOf(p), 1);
    return p;
  }
  upvoteById({ id }: { id: number }) {
    const post = this.findOne(id);
    post.votes++;
    return post;
  }
}
