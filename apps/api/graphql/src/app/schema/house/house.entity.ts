import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectType,
  OneToMany
} from 'typeorm';
import { BaseEntity } from '../../core';
import {
  PlanetEntity,
  CharacterEntity,
  ColorEntity,
} from '../entities';

@Entity()
export class HouseEntity extends BaseEntity {
  @Column({
    array: true,
    type: 'text',
    nullable: true,
  })
  events!: string[];

  @OneToMany(
    () => CharacterEntity,
    (characterEntity) => characterEntity.house,
    { nullable: true }
  )
  characters!: CharacterEntity[];

  @ManyToMany(
    () => PlanetEntity,
    (pe) => pe.houses,
    { nullable: true }
  )
  planets!: PlanetEntity[];

  @ManyToMany(
    (): ObjectType<ColorEntity> => ColorEntity,
    (ce) => ce.houses,
    {
      nullable: true,
    }
  )
  @JoinTable()
  colors: ColorEntity[];
}
