import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';
import { MapStateDto } from './map-state.dto';

@ArgsType()
export class MapStateQuery extends QueryArgsType(
  MapStateDto
) {}

export const TodoItemConnection =
  MapStateQuery.ConnectionType;
