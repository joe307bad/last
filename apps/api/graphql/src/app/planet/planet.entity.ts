import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanetarySystemEntity } from '../planetary-system/planetary-system.entity';

@Entity()
export class PlanetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column({ nullable: true })
  description!: string;

  @Column()
  enabled!: boolean;

  @Column({ nullable: true })
  population!: number;

  @Column({ nullable: true })
  level!: number;

  @ManyToOne(
    (): ObjectType<PlanetarySystemEntity> => PlanetarySystemEntity,
    (ps) => ps.planets,
    { onDelete: 'CASCADE', nullable: true, cascade: true }
  )
  @JoinColumn()
  planetarySystem!: PlanetarySystemEntity;
}
