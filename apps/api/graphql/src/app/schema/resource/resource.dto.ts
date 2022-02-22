import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { FilterableUnPagedRelation } from '@nestjs-query/query-graphql';
import { PlanetResourceDto } from '../dtos';

@ObjectType('Resource')
@FilterableUnPagedRelation(
  'planetResources',
  () => PlanetResourceDto,
  {
    disableRemove: true,
  }
)
export class ResourceDto extends BaseDto {}
