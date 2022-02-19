import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectType,
} from 'typeorm';
import { BaseEntity } from '../../core';
import {
  HouseEntity,
  FocusEntity,
  PlanetarySystemEntity,
  ColorEntity,
  TerrainEntity,
  ResourceEntity,
} from '../entities';

@Entity()
export class PlanetEntity extends BaseEntity {
  @Column({ default: 0 })
  initialAlignment!: number;

  @Column({ nullable: true })
  population!: number;

  @Column({ nullable: true })
  level!: number;

  @ManyToOne(
    (): ObjectType<PlanetarySystemEntity> =>
      PlanetarySystemEntity,
    (pse) => pse.planets,
    {
      nullable: true,
    }
  )
  @JoinColumn()
  planetarySystem!: PlanetarySystemEntity;

  @ManyToOne(
    (): ObjectType<HouseEntity> => HouseEntity,
    (he) => he.planets,
    { nullable: true }
  )
  @JoinColumn()
  rulingHouse!: HouseEntity;

  @ManyToMany(
    (): ObjectType<HouseEntity> => HouseEntity,
    (he) => he.planets,
    {
      nullable: true,
    }
  )
  @JoinTable()
  houses: HouseEntity[];

  @ManyToMany(
    (): ObjectType<ColorEntity> => ColorEntity,
    (ce) => ce.planets,
    {
      nullable: true,
    }
  )
  @JoinTable()
  colors: ColorEntity[];

  @ManyToMany(
    (): ObjectType<FocusEntity> => FocusEntity,
    (fe) => fe.planets,
    {
      nullable: true,
    }
  )
  @JoinTable()
  foci: FocusEntity[];

  @ManyToMany(
    (): ObjectType<ResourceEntity> =>
      ResourceEntity,
    (fe) => fe.planets,
    {
      nullable: true,
    }
  )
  @JoinTable()
  resources: ResourceEntity[];

  @ManyToMany(
    (): ObjectType<TerrainEntity> =>
      TerrainEntity,
    (fe) => fe.planets,
    {
      nullable: true,
    }
  )
  @JoinTable()
  terrains: TerrainEntity[];
}
