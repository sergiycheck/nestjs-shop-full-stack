import { GetPaginatedInput } from './../../graphql';
import { ArgsType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class GetPaginatedInputExtended extends GetPaginatedInput {
  constructor(attrs: GetPaginatedInput) {
    super();

    Object.assign(this, attrs);

    this.perPage = this.perPage ?? 20;
  }

  @Min(1)
  @Max(100)
  page: number;

  @IsOptional()
  @Min(1)
  @Max(100)
  perPage?: number;

  getPaginationParams() {
    return { skip: (this.page - 1) * this.perPage, take: this.perPage };
  }
}
