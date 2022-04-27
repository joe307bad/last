import {
  Authorize,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  ObjectType,
  ID,
  Field,
} from '@nestjs/graphql';
import { UserContext } from '../auth/auth.interfaces';

@ObjectType('Map')
@Authorize({
  authorize: (context: UserContext) => {
    return {
      ownerId: { eq: context.req.user.id },
    };
  },
})
export class MapDto {
  @IDField(() => ID) _id!: string;
  @Field({ nullable: true }) _rev!: string;
  @Field() height!: number;
  @Field() width!: number;
  @Field() territories!: string;
  @FilterableField() ownerId!: string;
}
