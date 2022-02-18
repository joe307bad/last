import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';

@Entity()
export class FocusEntity extends BaseEntity {

  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.foci,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
