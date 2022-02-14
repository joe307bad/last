import {
  QueryService,
  InjectQueryService,
} from '@nestjs-query/core';
import { PlanetEntity } from '../schema/planet/planet.entity';

export class GeneratorService {
  constructor(
    @InjectQueryService(PlanetEntity)
    readonly service: QueryService<PlanetEntity>
  ) {
  }

  createPlanets() {
    // create 90 characters
    // create 30 houses (3 characters per house)
    // create 10 planets (3 houses each)

    return this.service.query({});
  }
}
