
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    username?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export class CreatePostInput {
    title: string;
    authorId: number;
}

export class UpdatePostInput {
    id: number;
    title: string;
    authorId: number;
}

export class User {
    __typename?: 'User';
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    username: string;
    email: string;
    isActive?: Nullable<boolean>;
    created_at: number;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Post {
    __typename?: 'Post';
    id: number;
    title: string;
    votes?: Nullable<number>;
    authorId: number;
    created_at: number;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract userById(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract getUsersByFirstAndLast(firstName?: Nullable<string>, lastName?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract postById(id: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract posts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(userId: number): User | Promise<User>;

    abstract createPost(input: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(input: UpdatePostInput): Post | Promise<Post>;

    abstract upvotePost(postId: number): Post | Promise<Post>;

    abstract deletePost(postId: number): Post | Promise<Post>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract createdPost(input: string): Post | Promise<Post>;
}

type Nullable<T> = T | null;
