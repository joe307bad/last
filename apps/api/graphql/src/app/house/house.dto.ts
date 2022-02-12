import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { CharacterDto } from '../character/character.dto';
import { BaseDto } from '../base.dto';
import { RelationInput } from '../relation.input';

@ObjectType('House')
@UnPagedRelation('characters', () => CharacterDto, { disableRemove: true })
export class HouseDto extends BaseDto {}
