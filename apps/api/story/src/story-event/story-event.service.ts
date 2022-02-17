import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { StoryEventEntity } from './story-event.entity';

@Injectable()
export class StoryEventService {
  constructor(
    @InjectRepository(StoryEventEntity)
    private readonly storyEventRepo: Repository<StoryEventEntity>
  ) {}

  createTest() {
    return this.storyEventRepo.insert({
      entityId: 'hey there',
      eventData: 'hey',
      entityType: 'planet',
    });
  }
}
