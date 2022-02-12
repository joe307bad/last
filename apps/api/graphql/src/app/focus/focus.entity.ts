import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PlanetEntity } from '../planet/planet.entity';

@Entity()
export class FocusEntity extends BaseEntity {
  @ManyToMany(() => PlanetEntity, (pe) => pe.foci, { nullable: true })
  planets!: PlanetEntity[];
}
