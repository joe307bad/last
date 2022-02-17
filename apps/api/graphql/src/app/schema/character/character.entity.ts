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
  @Column({
    array: true,
    type: 'text',
    nullable: true,
  })
  events!: string[];

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
