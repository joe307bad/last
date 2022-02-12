import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { HouseDto } from '../house/house.dto';
import { RelationInput } from '../relation.input';
import { BaseDto } from '../base.dto';

@ObjectType('Character')
@Relation('house', () => HouseDto, { disableRemove: true })
export class CharacterDto extends BaseDto {
  @FilterableField({ nullable: true })
  houseId!: string;
}

@InputType()
export class CharacterInput extends PartialType(
  OmitType(CharacterDto, ['id', 'houseId'], InputType)
) {
  @Field(() => RelationInput, { nullable: true })
  house!: RelationInput;
}
