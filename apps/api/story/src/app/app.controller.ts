import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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

  @Get('story-event/entity/:id')
  getStoryEventsByEntity(@Param() params) {
    return this.storyEventService.getStoryEventsByEntity(
      params.id
    );
  }
}
