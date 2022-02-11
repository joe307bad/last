import { FilterableField, IDField, Relation } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { PlanetarySystemDto } from '../planetary-system/planetary-system.dto';

@ObjectType('Planet')
@Relation('planetarySystem', () => PlanetarySystemDto, { disableRemove: true })
export class PlanetDto {
  @Field()
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;

  description!: string;

  @FilterableField()
  population!: number;

  @FilterableField()
  level!: number;

  @FilterableField()
  enabled!: boolean;

  @FilterableField()
  planetarySystemId!: string;
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
