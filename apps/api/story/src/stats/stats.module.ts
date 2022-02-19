import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { StatsService } from './stats.service';
import { StatsEntity } from './stats.entity';

@Module({
  imports: [
    CouchDbModule.forFeature([StatsEntity]),
  ],
  providers: [StatsService],
  exports: [StatsService],
  controllers: [],
})
export class StatsModule {}
