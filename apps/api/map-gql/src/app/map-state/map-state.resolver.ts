import {
  AuthorizerInterceptor,
  CRUDResolver,
} from '@nestjs-query/query-graphql';
import { MapStateService } from './map-state.service';
import { MapStateDto } from './map-state.dto';
import { Resolver } from '@nestjs/graphql';
import {
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const guards = [JwtAuthGuard];

@Resolver(() => MapStateDto)
@UseInterceptors(AuthorizerInterceptor(MapStateDto))
export class MapStateResolver extends CRUDResolver(
  MapStateDto,
  {
    read: { guards },
    create: { guards },
    update: { guards },
    delete: { guards },
  }
) {
  constructor(readonly service: MapStateService) {
    super(service);
  }
}
