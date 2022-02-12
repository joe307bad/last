import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { CharacterDto, PlanetDto } from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('House')
@UnPagedRelation('characters', () => CharacterDto, { disableRemove: true })
@UnPagedRelation('planets', () => PlanetDto, { disableRemove: true })
export class HouseDto extends BaseDto {}
