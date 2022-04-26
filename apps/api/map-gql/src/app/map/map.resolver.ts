import {
  AuthorizationContext,
  Authorize,
  AuthorizerFilter,
  AuthorizerInterceptor,
  CRUDResolver,
  ConnectionType,
} from '@nestjs-query/query-graphql';
import { MapService } from './map.service';
import { MapDto } from './map.dto';
import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Filter,
  InjectQueryService,
  mergeFilter,
  mergeQuery,
  QueryService,
} from '@nestjs-query/core';
import { MapEntity } from './map.entity';
import { UserContext } from '../auth/auth.interfaces';
import { MapConnection } from './map.connection';
import { MapQuery } from './map.query';

@Resolver(() => MapDto)
@UseInterceptors(AuthorizerInterceptor(MapDto))
export class MapResolver extends CRUDResolver(
  MapDto
) {
  constructor(readonly service: MapService) {
    super(service);
  }
  // Set the return type to the TodoItemConnection
  // @Query(() => MapConnection)
  // async maps(
  //   @Args() query: MapQuery,
  //   @AuthorizerFilter()
  //   authFilter: Filter<MapDto>
  // ): Promise<ConnectionType<MapDto>> {
  //   // add the completed filter the user provided filter
  //   debugger;
  //   const filter: Filter<MapDto> = mergeFilter(
  //     query.filter ?? {},
  //     {
  //       height: { eq: 123 },
  //     }
  //   );
  //   const uncompletedQuery = mergeQuery(query, {
  //     filter: mergeFilter(filter, authFilter),
  //   });
  //   return MapConnection.createFromPromise(
  //     (q) => this.service.query(q),
  //     uncompletedQuery,
  //     (q) => this.service.count(q)
  //   );
  // }
}
