import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { FilterableField, FilterableUnPagedRelation, Relation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('PlanetResource')
@FilterableUnPagedRelation('planet', () => PlanetDto, {
  disableRemove: true,
})
@Relation('resource', () => PlanetDto, {
  disableRemove: true,
})
export class PlanetResourceDto extends BaseDto {
  @FilterableField({ nullable: true })
  planetId!: string;

  @FilterableField({ nullable: true })
  resourceId!: string;

  @FilterableField()
  initialAmount!: number;
}
