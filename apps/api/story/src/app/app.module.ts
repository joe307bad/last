import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryEventModule } from '../story-event/story-event.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'admin',
      userpass: 'password',
      requestDefaults: { jar: true },
    }),
    StoryEventModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}