import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PlanetarySystemEntity } from './planetary-system.entity';
import { PlanetarySystemDto } from './planetary-system.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([PlanetarySystemEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        { DTOClass: PlanetarySystemDto, EntityClass: PlanetarySystemEntity },
      ],
    }),
  ],
})
export class PlanetarySystemModule {}
