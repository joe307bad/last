import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
} from '@nestjs-query/query-graphql';
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
@FilterableUnPagedRelation(
  'characters',
  () => CharacterDto,
  {
    disableRemove: true,
  }
)
@FilterableUnPagedRelation(
  'planets',
  () => PlanetDto,
  {
    disableRemove: true,
  }
)
@FilterableUnPagedRelation(
  'colors',
  () => ColorDto,
  {
    disableRemove: true,
  }
)
export class HouseDto extends BaseDto {
  @FilterableField({ defaultValue: 0 })
  initialAlignment!: number;
}

@InputType()
export class HouseInput extends PartialType(
  OmitType(HouseDto, ['id'], InputType)
) {
  @Field(() => [RelationInput], {
    nullable: true,
  })
  colors!: RelationInput[];

  @Field(() => [RelationInput], {
    nullable: true,
  })
  characters!: RelationInput[];
}
