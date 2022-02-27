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
import { WebsocketService } from './modules/websockets/websocket.service';

@Controller()
export class AppController {
  constructor(
    private readonly storyEventService: StoryEventService,
    private readonly statsService: StatsService,
    private readonly websocketService: WebsocketService
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

  @Get('stats/entity/:id')
  getStatsByEntityId(@Param() params) {
    return this.statsService.getStatsByEntityId(
      params.id
    );
  }

  @Post('emit-stats')
  emitStats(@Body() stats: StatsEntity[]) {
    this.websocketService.socket.emit(
      'stats',
      stats
    );
    return stats;
  }
}
