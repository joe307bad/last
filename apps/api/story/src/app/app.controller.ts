import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { StoryEventEntity } from '../story-event/story-event.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Post()
  insertStoryEvents(
    @Body() storyEvent: StoryEventEntity[]
  ) {
    return this.appService.insertStoryEvents(
      storyEvent
    );
  }
}
