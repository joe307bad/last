import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { StoryEventEntity } from '../story-event/story-event.entity';
import { StoryEventService } from '../story-event/story-event.service';

@Controller()
export class AppController {
  constructor(
    private readonly storyEventService: StoryEventService
  ) {}

  @Post()
  insertStoryEvents(
    @Body() storyEvent: StoryEventEntity[]
  ) {
    return this.storyEventService.insertManyStoryEvents(
      storyEvent
    );
  }

  @Get('story-event/entity/:id')
  getStoryEventsByEntity(@Param() params) {
    return this.storyEventService.getStoryEventsByEntity(
      params.id
    );
  }
}
