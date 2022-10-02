import { GetPaginatedInput } from 'src/graphql';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetPaginatedInputExtended } from './../../user-posts/dtos/getPaginatedInput.args';

export abstract class BaseEntityService<ClassType extends { id: number }> {
  constructor(protected readonly repository: Repository<ClassType>) {}

  async findAll(dto: GetPaginatedInput) {
    const dtoExtended = new GetPaginatedInputExtended(dto);
    const { skip, take } = dtoExtended.getPaginationParams();
    const entities = await this.repository.find({ skip, take });
    return entities;
  }

  async findOneById(id: ClassType['id'], entityName: string) {
    const idTyped = id as any;
    const entity = await this.repository.findOneBy({ id: idTyped });
    if (!entity)
      throw new NotFoundException(`${entityName} with id ${id} was not found`);
    return entity;
  }

  async update(dto: { id: ClassType['id'] }, entityName: string) {
    const { id, ...update } = dto;
    const idTyped = id as any;
    const updatedEntity = await this.repository.update(
      { id: idTyped },
      { ...update },
    );

    if (!updatedEntity.affected)
      throw new NotFoundException(
        `${entityName} with id ${id} was not updated`,
      );

    return this.findOneById(id, entityName);
  }

  async delete(id: number, entityName: string) {
    const idTyped = id as any;
    const entity = await this.findOneById(id, entityName);
    await this.repository.delete({ id: idTyped });
    return entity;
  }
}
