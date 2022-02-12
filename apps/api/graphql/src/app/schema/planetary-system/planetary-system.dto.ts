import { FilterableField, UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { PlanetDto } from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('PlanetarySystem')
@UnPagedRelation('planets', () => PlanetDto, { disableRemove: true })
export class PlanetarySystemDto extends BaseDto {
  @FilterableField({ nullable: true })
  asteroidBelts!: number;

  @FilterableField({ nullable: true })
  suns!: number;
}