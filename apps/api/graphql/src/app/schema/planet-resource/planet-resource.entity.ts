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
    (type) => PlanetEntity,
    (p) => p.planetResources
  )
  @JoinColumn()
  planet: PlanetEntity;

  @ManyToOne(
    (type) => ResourceEntity,
    (r) => r.planetResources
  )
  @JoinColumn()
  resource: ResourceEntity;
}
