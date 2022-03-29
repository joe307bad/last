import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouchDbModule } from 'nest-couchdb';
import { MapEntity } from './entity/map.entity';
import { MapStateEntity } from './entity/map-state.entity';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'admin',
      userpass: 'password',
      requestDefaults: { jar: true },
    }),
    CouchDbModule.forFeature([
      MapEntity,
      MapStateEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
