import { Injectable } from '@nestjs/common';
import { StoryEventService } from '../story-event/story-event.service';
import { StoryEventEntity } from '../story-event/story-event.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly storyEventService: StoryEventService
  ) {}

  insertStoryEvents(storyEvents: StoryEventEntity[]) {
    return this.storyEventService.insertMany(
      storyEvents
    );
  }
}
