import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import {
  FilterableField,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { HouseDto, PlanetDto } from '../dtos';

@ObjectType('Color')
@UnPagedRelation('planets', () => PlanetDto, {
  disableRemove: true,
})
@UnPagedRelation('houses', () => HouseDto, {
  disableRemove: true,
})
export class ColorDto extends BaseDto {
  @FilterableField()
  hex!: string;
}
