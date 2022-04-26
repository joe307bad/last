import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';
import { MapDto } from './map.dto';

@ArgsType()
export class MapQuery extends QueryArgsType(
  MapDto
) {}

export const MapConnection =
  MapQuery.ConnectionType;
