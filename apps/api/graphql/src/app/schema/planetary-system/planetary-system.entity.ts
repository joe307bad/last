import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { PlanetEntity } from '../entities';
import { BaseEntity } from '../../core';

@Entity()
export class PlanetarySystemEntity extends BaseEntity {
  @Column({ default: 0 })
  initialAlignment!: number;

  @Column({ nullable: true })
  asteroidBelts!: number;

  @Column({ nullable: true })
  suns!: number;

  @OneToMany(
    () => PlanetEntity,
    (planetEntity) =>
      planetEntity.planetarySystem,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
