import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
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
} from './schema/dtos';

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
        ]),
      ],
      resolvers: [
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
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
