import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RelationInput {
  @Field(() => ID)
  id: string;
}
