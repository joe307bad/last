import {
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export abstract class BaseDto {
  @Field()
  @IDField(() => ID)
  id!: string;

  @FilterableField({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  description!: string;

  @Field()
  enabled!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
