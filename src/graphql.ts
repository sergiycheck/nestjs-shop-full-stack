
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePostInput {
    title: string;
    authorId: number;
}

export class UpdatePostInput {
    id: number;
    title: string;
    authorId: number;
}

export class Author {
    __typename?: 'Author';
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Post {
    __typename?: 'Post';
    id: number;
    title: string;
    votes?: Nullable<number>;
    authorId: number;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract author(id: number): Nullable<Author> | Promise<Nullable<Author>>;

    abstract allPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

    abstract getAuthorsByArgs(firstName?: Nullable<string>, lastName?: Nullable<string>): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createPost(input: CreatePostInput): Post | Promise<Post>;

    abstract update(input: UpdatePostInput): Post | Promise<Post>;

    abstract upvotePost(postId: number): Post | Promise<Post>;

    abstract deletePost(postId: number): Post | Promise<Post>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract createdPost(input: string): Post | Promise<Post>;
}

type Nullable<T> = T | null;
