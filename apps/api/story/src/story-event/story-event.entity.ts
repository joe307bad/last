import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('last')
export class StoryEventEntity extends CouchDbEntity {
  entityId: string;
  entityType:
    | 'planet'
    | 'house'
    | 'character'
    | 'planetarySystem';
  eventData: string;
}
