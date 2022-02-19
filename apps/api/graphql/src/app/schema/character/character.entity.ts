import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { HouseEntity } from '../entities';
import { BaseEntity } from '../../core';

@Entity()
export class CharacterEntity extends BaseEntity {
  @Column({ default: 0 })
  initialAlignment!: number;

  @ManyToOne(
    () => HouseEntity,
    (houseEntity) => houseEntity.characters,
    {
      nullable: true,
    }
  )
  @JoinColumn()
  house!: HouseEntity;
}
