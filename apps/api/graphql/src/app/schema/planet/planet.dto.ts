import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  RelationInput,
  BaseDto,
} from '../../core';
import {
  HouseDto,
  FocusDto,
  PlanetarySystemDto,
  TerrainDto,
  ResourceDto,
  ColorDto,
  PlanetResourceDto,
} from '../dtos';

@ObjectType('Planet')
@Relation(
  'planetarySystem',
  () => PlanetarySystemDto,
  {
    disableRemove: true,
    nullable: true,
  }
)
@Relation('rulingHouse', () => HouseDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableUnPagedRelation(
  'foci',
  () => FocusDto,
  {
    disableRemove: true,
    nullable: true,
  }
)
@FilterableUnPagedRelation(
  'houses',
  () => HouseDto,
  {
    disableRemove: true,
    nullable: true,
  }
)
@FilterableUnPagedRelation(
  'colors',
  () => ColorDto,
  {
    disableRemove: true,
    nullable: true,
  }
)
@FilterableUnPagedRelation(
  'planetResources',
  () => PlanetResourceDto,
  {
    disableRemove: true,
  }
)
@FilterableUnPagedRelation(
  'terrains',
  () => TerrainDto,
  {
    disableRemove: true,
    nullable: true,
  }
)
export class PlanetDto extends BaseDto {
  @FilterableField({ defaultValue: 0 })
  initialAlignment!: number;

  @FilterableField({ nullable: true })
  population!: number;

  @FilterableField({ nullable: true })
  level!: number;

  @FilterableField({ nullable: true })
  planetarySystemId!: string;

  @FilterableField({ nullable: true })
  rulingHouseId!: string;
}

@InputType()
export class PlanetInput extends PartialType(
  OmitType(
    PlanetDto,
    ['id', 'planetarySystemId', 'rulingHouseId'],
    InputType
  )
) {
  @Field(() => RelationInput, { nullable: true })
  planetarySystem!: RelationInput;

  @Field(() => RelationInput, { nullable: true })
  rulingHouse!: RelationInput;

  @Field(() => [RelationInput!]!, {
    nullable: true,
  })
  foci!: RelationInput[];

  @Field(() => [RelationInput!]!, {
    nullable: true,
  })
  houses!: RelationInput[];

  @Field(() => [RelationInput!]!, {
    nullable: true,
  })
  colors!: RelationInput[];

  @Field(() => [PlanetResourceInput!]!, {
    nullable: true,
  })
  planetResources!: PlanetResourceInput[];

  @Field(() => [PlanetResourceInput!]!, {
    nullable: true,
  })
  terrains!: RelationInput[];
}

@InputType()
export class PlanetResourceInput {
  @Field()
  resourceId: string;

  @Field()
  initialAmount: number;
}
