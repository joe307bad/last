import {
  FilterableField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { RelationInput, BaseDto } from '../../core';
import { HouseDto, FocusDto, PlanetarySystemDto } from '../dtos';

@ObjectType('Planet')
@Relation('planetarySystem', () => PlanetarySystemDto, {
  disableRemove: true,
  nullable: true,
})
@Relation('rulingHouse', () => HouseDto, {
  disableRemove: true,
  nullable: true,
})
@UnPagedRelation('foci', () => FocusDto, {
  disableRemove: true,
  nullable: true,
})
export class PlanetDto extends BaseDto {
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
  OmitType(PlanetDto, ['id', 'planetarySystemId', 'rulingHouseId'], InputType)
) {
  @Field(() => RelationInput, { nullable: true })
  planetarySystem!: RelationInput;

  @Field(() => RelationInput, { nullable: true })
  rulingHouse!: RelationInput;
}

// Planets
// name: string
// description: string
// population: number
// level: number
//
// planetarySystem: PlanetarySystem
// rulingHouse: House
//
// foci: PlanetFocus[]
// houses: House[]
// resources: PlanetResource[]
// colors: Color[]
// terrains: Terrain[]

// PlanetFocus
// focus: Focus
// level: number
// amount: number

// Focus
// name: string
// Spirtua (spiritual), Bellum (war + defence), Animalia (wildlife), Plantae (plants), Insecta (bugs and single-celled organisms), Languista (language and cognition)

// PlanetarySystem
// name: string
// planets: Planet[]
// asteroidBelts: number
// suns: number;

// Terrain
// name: string
// Desert, ice, tropical, dry, temperate, continental, polar, Canyons, Forest, Glacier, hill, gas, marshes, mountains. oasis, oceans, rivers, swamps, tundra, valleys,

// Color
// hex: string

// PlanetResource
// name: string
// resource: Resource
// amount: number

// House
// name: string
// description: string
// members: Character[]

// Character
// name: string
// house: House
