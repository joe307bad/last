import {
  Entity,
  CouchDbEntity,
} from 'nest-couchdb';

@Entity('stats')
export class StatsEntity extends CouchDbEntity {
  entityId: string;
  stats: string;
  [key: string]: any;
}
