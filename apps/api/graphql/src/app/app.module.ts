import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PlanetarySystemEntity } from './planetary-system/planetary-system.entity';
import { PlanetEntity } from './planet/planet.entity';
import { PlanetarySystemDto } from './planetary-system/planetary-system.dto';
import { PlanetDto, PlanetInput } from './planet/planet.dto';
import { HouseEntity } from './house/house.entity';
import { CharacterDto, CharacterInput } from './character/character.dto';
import { CharacterEntity } from './character/character.entity';
import { HouseDto } from './house/house.dto';
import { FocusEntity } from './focus/focus.entity';
import { FocusDto } from './focus/focus.dto';

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
        ]),
      ],
      resolvers: [
        { DTOClass: FocusDto, EntityClass: FocusEntity },
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
