import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import {
  CharacterDto,
  ColorDto,
  PlanetDto,
} from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('House')
@UnPagedRelation(
  'characters',
  () => CharacterDto,
  { disableRemove: true }
)
@UnPagedRelation('planets', () => PlanetDto, {
  disableRemove: true,
})
@UnPagedRelation('colors', () => ColorDto, {
  disableRemove: true,
})
export class HouseDto extends BaseDto {}
