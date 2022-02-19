import {
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { PlanetDto } from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('PlanetarySystem')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class PlanetarySystemDto extends BaseDto {
  @FilterableField({ defaultValue: 0 })
  initialAlignment!: number;

  @FilterableField({ nullable: true })
  asteroidBelts!: number;

  @FilterableField({ nullable: true })
  suns!: number;
}
