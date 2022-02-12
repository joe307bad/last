import { Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../core';
import { PlanetEntity, CharacterEntity } from '../entities';

@Entity()
export class HouseEntity extends BaseEntity {
  @OneToMany(
    () => CharacterEntity,
    (characterEntity) => characterEntity.house,
    { nullable: true }
  )
  characters!: CharacterEntity[];

  @ManyToMany(() => PlanetEntity, (pe) => pe.houses, { nullable: true })
  planets!: PlanetEntity[];
}
