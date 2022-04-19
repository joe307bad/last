import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig, ApolloFederationDriver
} from '@nestjs/apollo';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MapDto } from './map/map.dto';
import { AppService } from './app.service';
import { MapService } from './map/map.service';
import { CouchDbModule } from 'nest-couchdb';
import { MapEntity } from './map/map.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      services: [MapService],
      resolvers: [
        {
          DTOClass: MapDto,
          ServiceClass: MapService,
        },
      ],
      imports: [
        CouchDbModule.forRoot({
          url: 'http://localhost:5984',
          username: 'admin',
          userpass: 'password',
          requestDefaults: { jar: true },
        }),
        CouchDbModule.forFeature([MapEntity]),
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloFederationDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
