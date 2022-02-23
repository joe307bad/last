import { CouchDbEntity } from 'nest-couchdb';
import { EventTypes } from './EventTypes';

export type PlanetStoryEvent = {
  entityId: string;
  entityType: 'planet';
  eventType: EventTypes;
  valueChange: string;
  secondaryEntityId: string;
  createData: number;
} & CouchDbEntity;

export type PlanetStoryEventResponse = {
  docs: PlanetStoryEvent[];
};
