import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouchDbModule } from 'nest-couchdb';
import { MapEntity } from './map.entity';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'admin',
      userpass: 'password',
      requestDefaults: { jar: true },
    }),
    CouchDbModule.forFeature([MapEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
