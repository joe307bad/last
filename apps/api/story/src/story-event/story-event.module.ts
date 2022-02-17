import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { StoryEventService } from './story-event.service';
import { StoryEventEntity } from './story-event.entity';

@Module({
  imports: [
    CouchDbModule.forFeature([StoryEventEntity]),
  ],
  providers: [StoryEventService],
  exports: [StoryEventService],
  controllers: [],
})
export class StoryEventModule {}
