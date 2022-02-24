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
import {
  StatsEntity,
  StatsService,
} from './modules/stats';

@Controller()
export class AppController {
  constructor(
    private readonly storyEventService: StoryEventService,
    private readonly statsService: StatsService
  ) {}

  @Post()
  insertStoryEvents(
    @Body() storyEvents: StoryEventEntity[]
  ) {
    return this.storyEventService.insertManyStoryEvents(
      storyEvents
    );
  }

  @Post('stats')
  upsertManyStatsForEntity(
    @Body() stats: StatsEntity[]
  ) {
    return this.statsService.upsertManyStats(
      stats
    );
  }

  @Get('story-event/entity/:id')
  getStoryEventsByEntity(@Param() params) {
    return this.storyEventService.getStoryEventsByEntity(
      params.id
    );
  }
}
