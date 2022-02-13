import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';

@Entity()
export class TerrainEntity extends BaseEntity {
  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.terrains,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
