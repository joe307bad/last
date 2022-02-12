import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { CharacterDto } from '../dtos';
import { BaseDto } from '../../core';

@ObjectType('House')
@UnPagedRelation('characters', () => CharacterDto, { disableRemove: true })
export class HouseDto extends BaseDto {}
