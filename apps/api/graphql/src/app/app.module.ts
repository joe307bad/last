import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig, ApolloFederationDriver
} from '@nestjs/apollo';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import {
  PlanetarySystemEntity,
  PlanetEntity,
  HouseEntity,
  CharacterEntity,
  FocusEntity,
  ColorEntity,
  TerrainEntity,
  ResourceEntity,
  PlanetResourceEntity,
} from './schema/entities';
import {
  PlanetarySystemDto,
  PlanetDto,
  HouseDto,
  CharacterDto,
  FocusDto,
  CharacterInput,
  PlanetInput,
  ColorDto,
  TerrainDto,
  HouseInput,
  ResourceDto,
  PlanetResourceDto,
} from './schema/dtos';
import { GeneratorService } from './generator/generator.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          PlanetarySystemEntity,
          PlanetEntity,
          HouseEntity,
          CharacterEntity,
          FocusEntity,
          ColorEntity,
          TerrainEntity,
          ResourceEntity,
          PlanetResourceEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: PlanetResourceDto,
          EntityClass: PlanetResourceEntity,
        },
        {
          DTOClass: ResourceDto,
          EntityClass: ResourceEntity,
        },
        {
          DTOClass: TerrainDto,
          EntityClass: TerrainEntity,
        },
        {
          DTOClass: FocusDto,
          EntityClass: FocusEntity,
        },
        {
          DTOClass: ColorDto,
          EntityClass: ColorEntity,
        },
        {
          DTOClass: HouseDto,
          EntityClass: HouseEntity,
          CreateDTOClass: HouseInput,
        },
        {
          DTOClass: CharacterDto,
          EntityClass: CharacterEntity,
          CreateDTOClass: CharacterInput,
        },
        {
          DTOClass: PlanetarySystemDto,
          EntityClass: PlanetarySystemEntity,
        },
        {
          DTOClass: PlanetDto,
          EntityClass: PlanetEntity,
          CreateDTOClass: PlanetInput,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'last',
      username: 'root',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      // dropSchema: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloFederationDriver,
    }),
  ],
  controllers: [AppController],
  providers: [GeneratorService],
})
export class AppModule {}
