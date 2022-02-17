import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity } from '../entities';

@Entity()
export class FocusEntity extends BaseEntity {
  @Column({
    array: true,
    type: 'text',
    nullable: true,
  })
  events!: string[];

  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.foci,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
