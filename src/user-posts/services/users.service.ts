import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/graphql';
import { Repository } from 'typeorm';
import GetUsersArgs from '../dtos/get-user.args';
import { User } from '../entities/user.entity';
import { PostsService } from './posts.service';
import { randomUUID } from 'crypto';
import { BaseEntityService } from 'src/common/services/base-entityt.service';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async create(dto: CreateUserInput) {
    const newUser = new User({
      username: dto.username ?? `unnamed-${randomUUID()}`,
      email: dto.email,
      firstName: dto.firstName ?? '',
      lastName: dto.lastName ?? '',
      isActive: false,
    });

    const savedUser = await this.usersRepository.save(newUser);
    return this.findOneById(savedUser.id, 'user');
  }

  getUsersByArgs(args: GetUsersArgs) {
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

  async delete(id: number) {
    return super.delete(id, 'user');
  }
}
