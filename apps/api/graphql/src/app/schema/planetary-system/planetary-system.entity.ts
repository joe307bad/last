import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { PlanetEntity } from '../entities';
import { BaseEntity } from '../../core';

@Entity()
export class PlanetarySystemEntity extends BaseEntity {
  @Column({ nullable: true })
  asteroidBelts!: number;

  @Column({ nullable: true })
  suns!: number;

  @Column({
    array: true,
    type: 'text',
    nullable: true,
  })
  events!: string[];

  @OneToMany(
    () => PlanetEntity,
    (planetEntity) =>
      planetEntity.planetarySystem,
    { nullable: true }
  )
  planets!: PlanetEntity[];
}
