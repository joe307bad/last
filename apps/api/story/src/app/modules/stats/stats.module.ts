import { Module } from '@nestjs/common';
import { CouchDbModule } from 'nest-couchdb';
import { StatsService } from './stats.service';
import { StatsEntity } from './stats.entity';
import { StatsProcessor } from './stats.processor';

@Module({
  imports: [
    CouchDbModule.forFeature([StatsEntity]),
  ],
  providers: [StatsService, StatsProcessor],
  exports: [StatsService, StatsProcessor],
  controllers: [],
})
export class StatsModule {}
