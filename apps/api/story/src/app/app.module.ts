import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { StoryEventModule } from './modules/story-event';
import { StatsModule } from './modules/stats';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'admin',
      userpass: 'password',
      requestDefaults: { jar: true },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        no_ready_check: true,
        auth_pass: 'password',
      },
    }),

    StoryEventModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
