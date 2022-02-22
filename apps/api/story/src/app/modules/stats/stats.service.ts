import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { StatsEntity } from './stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(StatsEntity)
    private readonly statsRepo: Repository<StatsEntity>
  ) {}

  createTest() {
    return this.statsRepo.insert({
      entityId: 'hey there',
      statsData: 'hey stats'
    });
  }
}
