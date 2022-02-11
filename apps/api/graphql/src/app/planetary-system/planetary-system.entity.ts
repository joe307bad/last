import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlanetEntity } from '../planets/planet.entity';

@Entity()
export class PlanetarySystemEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column()
  asteroidBelts!: number;

  @Column()
  suns!: number;

  @OneToMany(() => PlanetEntity, (planetEntity) => planetEntity.planetarySystem)
  planets!: PlanetEntity[];
}
