import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../core';
import {
  PlanetEntity,
  ResourceEntity,
} from '../entities';

@Entity()
export class PlanetResourceEntity extends BaseEntity {

  @Column()
  planetId: number;

  @Column()
  resourceId: number;

  @Column()
  initialAmount: number;

  @ManyToOne(
    () => PlanetEntity,
    (p) => p.planetResources
  )
  @JoinColumn()
  planet: PlanetEntity;

  @ManyToOne(
    () => ResourceEntity,
    (r) => r.planetResources
  )
  @JoinColumn()
  resource: ResourceEntity;
}
