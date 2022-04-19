import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { MapDto } from './map.dto';

@Resolver(() => MapDto)
export class MapResolver extends CRUDResolver(
  MapDto
) {}
