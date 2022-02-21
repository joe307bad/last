import { CouchDbEntity } from 'nest-couchdb';

export type PlanetStoryEvent = {
  entityId: string;
  entityType: 'planet';
  eventType: 'resource_boon';
  valueChange: string;
  secondaryEntityId: string;
  createData: number;
} & CouchDbEntity;

export type PlanetStoryEventResponse = {
  docs: PlanetStoryEvent[];
};
