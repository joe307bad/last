import { Column, Entity, OneToMany } from 'typeorm';
import { PlanetEntity } from '../planet/planet.entity';
import { BaseEntity } from '../base.entity';

@Entity()
export class PlanetarySystemEntity extends BaseEntity {
  @Column({ nullable: true })
  asteroidBelts!: number;

  @Column({ nullable: true })
  suns!: number;

  @OneToMany(() => PlanetEntity, (planetEntity) => planetEntity.planetarySystem, { nullable: true })
  planets!: PlanetEntity[];
}
