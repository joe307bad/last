import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../core';
import {
  HouseEntity,
  PlanetEntity,
} from '../entities';

@Entity()
export class ColorEntity extends BaseEntity {
  @Column()
  hex!: string;

  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.colors,
    { nullable: true }
  )
  planets!: PlanetEntity[];

  @ManyToMany(
    () => HouseEntity,
    (he) => he.colors,
    { nullable: true }
  )
  houses!: HouseEntity[];
}
