import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('map-state')
export class MapStateEntity extends CouchDbEntity {
  mapId: string;
  mapState: string;
}
