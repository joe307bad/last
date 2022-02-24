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

  async upsertManyStats(stats: StatsEntity[]) {
    const entityIds = stats.map(
      (stat) => stat.entityId
    );
    const extantStats = await this.statsRepo.find(
      {
        selector: {
          entityId: { $or: entityIds },
        },
      }
    );
    const statsWithExistingEntityIds = stats.map(
      (stat) => {
        const statExists = extantStats.docs.find(
          (es) => es.entityId === stat.entityId
        );
        if (statExists) {
          return {
            _id: statExists._id,
            _rev: statExists._rev,
            ...stat,
          };
        }

        return stat;
      }
    );

    return this.statsRepo.bulk({
      docs: statsWithExistingEntityIds,
    });
  }
}
