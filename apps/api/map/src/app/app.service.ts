import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { MapEntity } from './map.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepo: Repository<MapEntity>
  ) {}

  createManyMaps(
    height: number,
    width: number,
    numberOfRegions: number,
    numberOfMaps: number
  ) {
    const territorySeeds = () =>
      [...new Array(numberOfRegions)].map(() => ({
        x: Math.random() * height,
        y: Math.random() * width,
        id: uuid(),
      }));

    return this.mapRepo.bulk({
      docs: [...new Array(numberOfMaps)].map(
        () => ({
          height,
          width,
          territories: JSON.stringify(
            territorySeeds()
          ),
        })
      ),
    });
  }

  getMapById(mapId: string) {
    return this.mapRepo.get(mapId);
  }
}
