import {
  AuthorizationContext,
  Authorize,
  FilterableField,
  FilterableRelation,
  IDField,
  KeySet,
} from '@nestjs-query/query-graphql';
import {
  ObjectType,
  ID,
  Field,
} from '@nestjs/graphql';
import { UserContext } from '../auth/auth.interfaces';
import { UnauthorizedException } from '@nestjs/common';
import { Filter } from '@nestjs-query/core';
@ObjectType('Map')
@KeySet(['_id'])
// TODO for authorization, what probably needs to be done is:
// - since we need to use a custom service, we dont get the
//    auth filter applied out of the box
// - so the map service should probably be a pure mapping
//    from nano/couchdb to nestjs-query (e.g. no filter/auth/
//    paging logic) (update: this is correct, it should be pure)
// - and the auth filters may have to be applied manually via
//    a custom resolver
// - but this is less than ideal because we dont want to have
//    to manually write all the resolver code, can we just access
//    the authorization filter in the service? We can't do this,
//    we tried injecting the AuthorizedFilter into a service method
//    and it does not work
// - we should be able to use a custome resolver and only apply the
//    auth filters via guards and not have to write a ton of resolver code
//    https://doug-martin.github.io/nestjs-query/docs/graphql/resolvers
//
@Authorize({
  authorize: (context: UserContext) => {
    //throw new UnauthorizedException();
    return { height: { eq: 123 } };
  },
})
// @FilterableRelation('owner', () => UserDTO, { disableRemove: true, disableUpdate: true })
export class MapDto {
  @IDField(() => ID) _id!: string;
  @Field({ nullable: true }) _rev!: string;
  @Field() height!: number;
  @Field() width!: number;
  @Field() territories!: string;
  @FilterableField() ownerId!: string;
}
