import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { HouseEntity } from '../house/house.entity';
import { BaseEntity } from '../base.entity';

@Entity()
export class CharacterEntity extends BaseEntity {
  @ManyToOne(() => HouseEntity, (houseEntity) => houseEntity.characters,  { nullable: true })
  @JoinColumn()
  house!: HouseEntity;
}
