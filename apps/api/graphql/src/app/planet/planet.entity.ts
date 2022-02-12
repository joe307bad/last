import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ObjectType,
  OneToOne,
} from 'typeorm';
import { PlanetarySystemEntity } from '../planetary-system/planetary-system.entity';
import { BaseEntity } from '../base.entity';
import { HouseEntity } from '../house/house.entity';
import { FocusDto } from '../focus/focus.dto';
import { FocusEntity } from '../focus/focus.entity';

@Entity()
export class PlanetEntity extends BaseEntity {
  @Column({ nullable: true })
  population!: number;

  @Column({ nullable: true })
  level!: number;

  @OneToOne((): ObjectType<PlanetarySystemEntity> => PlanetarySystemEntity, {
    nullable: true,
  })
  @JoinColumn()
  planetarySystem!: PlanetarySystemEntity;

  @OneToOne((): ObjectType<HouseEntity> => HouseEntity, { nullable: true })
  @JoinColumn()
  rulingHouse!: HouseEntity;

  @ManyToMany((): ObjectType<FocusEntity> => FocusEntity, (fe) => fe.planets, {nullable: true})
  @JoinTable()
  foci: FocusDto[];
}
