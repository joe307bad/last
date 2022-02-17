import {
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { HouseDto } from '../dtos';
import {
  RelationInput,
  BaseDto,
} from '../../core';

@ObjectType('Character')
@Relation('house', () => HouseDto, {
  disableRemove: true,
})
export class CharacterDto extends BaseDto {
  @Field(() => [String], {
    nullable: true,
  })
  events!: string[];

  @FilterableField({ nullable: true })
  houseId!: string;
}

@InputType()
export class CharacterInput extends PartialType(
  OmitType(
    CharacterDto,
    ['id', 'houseId'],
    InputType
  )
) {
  @Field(() => RelationInput, { nullable: true })
  house!: RelationInput;
}
