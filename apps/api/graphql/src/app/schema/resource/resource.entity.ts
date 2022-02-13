import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';

@Entity()
export class ResourceEntity extends BaseEntity {
  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.resources,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
