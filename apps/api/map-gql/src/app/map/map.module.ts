import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CouchDbModule } from 'nest-couchdb';
import { MapService } from './map.service';
import { MapDto } from './map.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MapEntity } from './map.entity';
import { PassportModule } from '@nestjs/passport';
import { MapResolver } from './map.resolver';

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
// @Module({
//   imports: [
//     CouchDbModule.forRoot({
//       url: 'http://localhost:5984',
//       username: 'admin',
//       userpass: 'password',
//       requestDefaults: { jar: true },
//     }),
//     CouchDbModule.forFeature([MapEntity]),
//   ],
//   providers: [MapService, MapResolver],
//   exports: [MapService]
//   //   NestjsQueryGraphQLModule.forFeature({
//   //     services: [MapService],
//   //     imports: [
//   //       MapResolver,
//   //       CouchDbModule.forRoot({
//   //         url: 'http://localhost:5984',
//   //         username: 'admin',
//   //         userpass: 'password',
//   //         requestDefaults: { jar: true },
//   //       }),
//   //       CouchDbModule.forFeature([MapEntity]),
//   //     ],
//   //   }),
//   // ],
// })
export class MapModule {}
