import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { StatsService } from './stats.service';
import { StatsEntity } from './stats.entity';
import { StatsConsumer } from './stats.consumer';

@Module({
  imports: [
    CouchDbModule.forFeature([StatsEntity]),
  ],
  providers: [StatsService, StatsConsumer],
  exports: [StatsService, StatsConsumer],
  controllers: [],
})
export class StatsModule {}
