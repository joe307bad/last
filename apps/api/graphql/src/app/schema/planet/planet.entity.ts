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
import { HouseEntity, FocusEntity, PlanetarySystemEntity } from '../entities';

@Entity()
export class PlanetEntity extends BaseEntity {
  @Column({ nullable: true })
  population!: number;

  @Column({ nullable: true })
  level!: number;

  @ManyToOne(
    (): ObjectType<PlanetarySystemEntity> => PlanetarySystemEntity,
    (pse) => pse.planets,
    {
      nullable: true,
    }
  )
  @JoinColumn()
  planetarySystem!: PlanetarySystemEntity;

  @ManyToOne((): ObjectType<HouseEntity> => HouseEntity, { nullable: true })
  @JoinColumn()
  rulingHouse!: HouseEntity;

  @ManyToMany((): ObjectType<HouseEntity> => HouseEntity, (he) => he.planets, {
    nullable: true,
  })
  @JoinTable()
  houses: HouseEntity[];

  @ManyToMany((): ObjectType<FocusEntity> => FocusEntity, (fe) => fe.planets, {
    nullable: true,
  })
  @JoinTable()
  foci: FocusEntity[];
}