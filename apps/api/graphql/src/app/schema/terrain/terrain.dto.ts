import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { Relation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('Terrain')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class TerrainDto extends BaseDto {}
