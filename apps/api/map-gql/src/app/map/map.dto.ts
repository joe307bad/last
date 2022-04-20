import {
  AuthorizationContext,
  Authorize,
  IDField,
  KeySet,
} from '@nestjs-query/query-graphql';
import {
  ObjectType,
  ID,
  Field,
} from '@nestjs/graphql';
import { MapAuthorizer } from './map.authorizer';
@ObjectType('Map')
@KeySet(['_id'])
@Authorize(MapAuthorizer)
export class MapDto {
  @IDField(() => ID) _id!: string;
  @Field({ nullable: true }) _rev!: string;
  @Field() height!: number;
  @Field() width!: number;
  @Field() territories!: string;
  @Field() ownerId!: string;
}
