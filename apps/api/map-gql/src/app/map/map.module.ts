import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CouchDbModule } from 'nest-couchdb';
import { MapService } from './map.service';
import { MapDto } from './map.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MapEntity } from './map.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    NestjsQueryGraphQLModule.forFeature({
      services: [MapService],
      resolvers: [
        {
          DTOClass: MapDto,
          ServiceClass: MapService,
          guards: [JwtAuthGuard],
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
  ],
})
export class MapModule {}
