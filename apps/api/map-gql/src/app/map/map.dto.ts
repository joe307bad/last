import {
  IDField,
  KeySet,
} from '@nestjs-query/query-graphql';
import {
  ObjectType,
  ID,
  Field,
} from '@nestjs/graphql';
@ObjectType('Map')
@KeySet(['_id'])
export class MapDto {
  @IDField(() => ID) _id!: string;
  @Field({ nullable: true }) _rev!: string;
  @Field() height!: number;
  @Field() width!: number;
  @Field() territories!: string;
}
