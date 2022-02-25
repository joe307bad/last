import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { StoryEventService } from './story-event.service';
import { StoryEventEntity } from './story-event.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CouchDbModule.forFeature([StoryEventEntity]),
    BullModule.registerQueue({
      name: 'stats',
    }),
  ],
  providers: [StoryEventService],
  exports: [StoryEventService],
  controllers: [],
})
export class StoryEventModule {}
