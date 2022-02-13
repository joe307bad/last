import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import {
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import { HouseDto, PlanetDto } from '../dtos';

@ObjectType('Color')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
@Relation('houses', () => HouseDto, {
  disableRemove: true,
})
export class ColorDto extends BaseDto {
  @FilterableField()
  hex!: string;
}
