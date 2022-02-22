import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('story-event')
export class StoryEventEntity extends CouchDbEntity {
  entityId: string;
  entityType: string;
  [key: string]: any;
}
