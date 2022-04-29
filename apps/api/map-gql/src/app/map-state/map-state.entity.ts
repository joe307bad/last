import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('map-state')
export class MapStateEntity extends CouchDbEntity {
  height: number;
  width: number;
  territories: string;
  ownerId: string;
}
