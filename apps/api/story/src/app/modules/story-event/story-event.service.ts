import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { StoryEventEntity } from './story-event.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class StoryEventService {
  constructor(
    @InjectRepository(StoryEventEntity)
    private readonly storyEventRepo: Repository<StoryEventEntity>,
    @InjectQueue('stats')
    private statsQueue: Queue
  ) {}

  insertManyStoryEvents(
    storyEventEntities: StoryEventEntity[]
  ) {
    return this.storyEventRepo
      .bulk({
        docs: storyEventEntities,
      })
      .then((res) => {
        storyEventEntities.forEach(
          async (see) =>
            await this.statsQueue.add(
              'calculation-request',
              [see.entityId, see.entityType]
            )
        );
        return res;
      });
  }

  getStoryEventsByEntity(entityId: string) {
    return this.storyEventRepo.find({
      selector: { entityId: { $eq: entityId } },
    });
  }
}
