import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';

import { AppController } from './app.controller';
import { StoryEventModule } from './modules/story-event';
import { StatsModule } from './modules/stats';

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
  providers: [],
})
export class AppModule {}
