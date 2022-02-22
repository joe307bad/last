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

  insertManyStoryEvents(
    storyEventEntities: StoryEventEntity[]
  ) {
    return this.storyEventRepo.bulk({
      docs: storyEventEntities,
    });
  }

  getStoryEventsByEntity(entityId: string) {
    return this.storyEventRepo.find({
      selector: { entityId: { $eq: entityId } },
    });
  }
}
