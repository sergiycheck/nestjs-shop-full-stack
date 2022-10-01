import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/graphql';
import { Repository } from 'typeorm';
import GetAuthorArgs from '../dtos/get-author.args';
import { User } from '../entities/user.entity';
import { PostsService } from './posts.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserInput) {
    const newUser = this.usersRepository.create({
      username: dto.username ?? `unnamed-${randomUUID()}`,
      email: dto.email,
      firstName: dto.firstName ?? '',
      lastName: dto.lastName ?? '',
    });

    return this.usersRepository.save(newUser);
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  getAuthorsByArgs(args: GetAuthorArgs) {
    const tableName = this.usersRepository.metadata.tableName;
    const builder = this.usersRepository.createQueryBuilder(tableName);
    const { firstName, lastName } = args;

    if (firstName) {
      builder.where(`position(:firstName in ${tableName}.firstName) > 0)`, {
        firstName,
      });
    }

    if (lastName) {
      builder.where(`position(:lastName in ${tableName}.lastName) > 0)`, {
        lastName,
      });
    }

    return builder.getMany();
  }
}
