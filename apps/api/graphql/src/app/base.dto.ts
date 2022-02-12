import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseDto {
  @Field()
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @Field()
  description!: string;

  @Field()
  enabled!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
