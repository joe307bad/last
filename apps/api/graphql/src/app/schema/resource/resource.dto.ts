import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('Resource')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class ResourceDto extends BaseDto {
  @FilterableField({ defaultValue: 0 })
  initialAmount!: number;
}
