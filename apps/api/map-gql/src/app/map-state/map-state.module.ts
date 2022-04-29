import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CouchDbModule } from 'nest-couchdb';
import { MapStateService } from './map-state.service';
import { MapStateDto } from './map-state.dto';
import { MapStateEntity } from './map-state.entity';
import { MapStateResolver } from './map-state.resolver';

@Module({
  providers: [MapStateResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      services: [MapStateService],
      resolvers: [],
      dtos: [{ DTOClass: MapStateDto }],
      imports: [
        CouchDbModule.forRoot({
          url: 'http://localhost:5984',
          username: 'admin',
          userpass: 'password',
          requestDefaults: { jar: true },
        }),
        CouchDbModule.forFeature([MapStateEntity]),
      ],
    }),
  ],
})
export class MapStateModule {}
