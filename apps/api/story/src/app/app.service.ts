import { Injectable } from '@nestjs/common';
import { StoryEventService } from '../story-event/story-event.service';

@Injectable()
export class AppService {
  constructor(
    private readonly storyEventService: StoryEventService
  ) {}

  getData(): { message: string } {
    this.storyEventService.createTest();
    return { message: 'Welcome to api/story!' };
  }
}
