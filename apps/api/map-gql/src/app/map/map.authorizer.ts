import {
  Authorizer,
  AuthorizationContext,
} from '@nestjs-query/query-graphql';
import { Filter } from '@nestjs-query/core';
import { MapDto } from './map.dto';
import { UserContext } from '../auth/auth.interfaces';
import { UnauthorizedException } from '@nestjs/common';

export class MapAuthorizer
  implements Authorizer<MapDto>
{
  authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext
  ): Promise<Filter<any>> {
    if (authorizationContext?.readonly) {
      return Promise.resolve({});
    }
    return Promise.resolve({
      ownerId: { eq: context.req.user.id },
    });
  }
  authorizeRelation(
    relationName: string,
    context: UserContext
  ): Promise<Filter<unknown>> {
    if (relationName === 'todoItem') {
      return Promise.resolve({
        ownerId: { eq: context.req.user.id },
      });
    }
    return Promise.resolve({});
  }
}
