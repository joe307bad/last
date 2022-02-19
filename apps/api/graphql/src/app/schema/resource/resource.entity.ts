import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';

@Entity()
export class ResourceEntity extends BaseEntity {
  @Column({ default: 0 })
  initialAmount!: number;

  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.resources,
    { nullable: true }
  )
  planets!: PlanetEntity[];

}
