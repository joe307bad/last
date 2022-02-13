import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { Relation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('Resource')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class ResourceDto extends BaseDto {}
