import { Relation } from '@nestjs-query/query-graphql';
import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  CharacterDto,
  ColorDto,
  PlanetDto,
} from '../dtos';
import {
  BaseDto,
  RelationInput,
} from '../../core';

@ObjectType('House')
@Relation('characters', () => CharacterDto, {
  disableRemove: true,
})
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
@Relation('colors', () => ColorDto, {
  disableRemove: true,
})
export class HouseDto extends BaseDto {}

@InputType()
export class HouseInput extends PartialType(
  OmitType(HouseDto, ['id'], InputType)
) {
  @Field(() => [RelationInput], {
    nullable: true,
  })
  colors!: RelationInput[];
}
