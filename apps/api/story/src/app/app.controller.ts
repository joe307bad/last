import {
  Body,
  Controller,
  Get, NotImplementedException,
  Param,
  Post
} from '@nestjs/common';
import {
  StoryEventEntity,
  StoryEventService,
} from './modules/story-event';

@Controller()
export class AppController {
  constructor(
    private readonly storyEventService: StoryEventService
  ) {}

  @Post()
  insertStoryEvents(
    @Body() storyEvents: StoryEventEntity[]
  ) {
    return this.storyEventService.insertManyStoryEvents(
      storyEvents
    );
  }

  @Post()
  insertStatsForEntity(
    @Body() storyEvents: StoryEventEntity[]
  ) {
    // TODO ability to get stats for entity. How should stats be structured
    // so that we can calculate a leaderboard easily? Do we need a leaderboard service?
    throw new Error("Not implemented")
  }

  @Get('story-event/entity/:id')
  getStoryEventsByEntity(@Param() params) {
    return this.storyEventService.getStoryEventsByEntity(
      params.id
    );
  }
}
