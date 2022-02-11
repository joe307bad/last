import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PlanetEntity } from './planet.entity';
import { PlanetDto } from './planet.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([PlanetEntity])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: PlanetDto, EntityClass: PlanetEntity }],
    }),
  ],
})
export class PlanetModule {}
