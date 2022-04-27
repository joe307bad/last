import {
  AuthorizerInterceptor,
  CRUDResolver,
} from '@nestjs-query/query-graphql';
import { MapService } from './map.service';
import { MapDto } from './map.dto';
import { Resolver } from '@nestjs/graphql';
import {
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const guards = [JwtAuthGuard];

@Resolver(() => MapDto)
@UseInterceptors(AuthorizerInterceptor(MapDto))
export class MapResolver extends CRUDResolver(
  MapDto,
  {
    read: { guards },
    create: { guards },
    update: { guards },
    delete: { guards },
  }
) {
  constructor(readonly service: MapService) {
    super(service);
  }
}
