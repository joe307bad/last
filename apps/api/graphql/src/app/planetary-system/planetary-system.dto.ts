import { FilterableField, UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { PlanetDto } from '../planet/planet.dto';
import { BaseDto } from '../base.dto';

@ObjectType('PlanetarySystem')
@UnPagedRelation('planets', () => PlanetDto, { disableRemove: true })
export class PlanetarySystemDto extends BaseDto {
  @FilterableField({ nullable: true })
  asteroidBelts!: number;

  @FilterableField({ nullable: true })
  suns!: number;
}
