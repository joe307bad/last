import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import {
  PlanetarySystemEntity,
  PlanetEntity,
  HouseEntity,
  CharacterEntity,
  FocusEntity,
  ColorEntity,
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
        ]),
      ],
      resolvers: [
        { DTOClass: FocusDto, EntityClass: FocusEntity },
        { DTOClass: ColorDto, EntityClass: ColorEntity },
        { DTOClass: HouseDto, EntityClass: HouseEntity },
        {
          DTOClass: CharacterDto,
          EntityClass: CharacterEntity,
          CreateDTOClass: CharacterInput,
        },
        { DTOClass: PlanetarySystemDto, EntityClass: PlanetarySystemEntity },
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
