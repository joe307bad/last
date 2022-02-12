import { Entity, OneToMany, OneToOne } from 'typeorm';
import { CharacterEntity } from '../character/character.entity';
import { BaseEntity } from '../base.entity';
import { PlanetEntity } from '../planet/planet.entity';

@Entity()
export class HouseEntity extends BaseEntity {
  @OneToMany(
    () => CharacterEntity,
    (characterEntity) => characterEntity.house,
    { nullable: true }
  )
  characters!: CharacterEntity[];

  @OneToOne(() => PlanetEntity, { nullable: true })
  planet!: PlanetEntity;
}
