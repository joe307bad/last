import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('map')
export class MapEntity extends CouchDbEntity {
  height: number;
  width: number;
  territories: string;
}
