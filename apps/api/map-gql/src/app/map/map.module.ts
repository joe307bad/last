import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CouchDbModule } from 'nest-couchdb';
import { MapService } from './map.service';
import { MapDto } from './map.dto';
import { MapEntity } from './map.entity';
import { MapResolver } from './map.resolver';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [MapResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      services: [MapService],
      resolvers: [],
      dtos: [{ DTOClass: MapDto }],
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
  ],
})
export class MapModule {}
