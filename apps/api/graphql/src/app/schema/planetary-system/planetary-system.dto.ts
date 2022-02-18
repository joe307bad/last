import {
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { PlanetDto } from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('PlanetarySystem')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class PlanetarySystemDto extends BaseDto {
  @FilterableField({ nullable: true })
  asteroidBelts!: number;

  @FilterableField({ nullable: true })
  suns!: number;
}
