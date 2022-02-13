import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('Focus')
@UnPagedRelation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class FocusDto extends BaseDto {}
