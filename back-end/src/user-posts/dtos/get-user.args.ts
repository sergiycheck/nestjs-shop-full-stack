import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
class GetUserArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  lastName: string;
}
export default GetUserArgs;
