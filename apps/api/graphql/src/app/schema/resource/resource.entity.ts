import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';
import { PlanetResourceEntity } from '../planet-resource/planet-resource.entity';

@Entity()
export class ResourceEntity extends BaseEntity {
  @OneToMany(
    () => PlanetResourceEntity,
    (pre) => pre.planet
  )
  planetResources: PlanetResourceEntity[];
}
