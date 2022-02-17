import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../../core';
import { Relation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../dtos';

@ObjectType('Focus')
@Relation('planets', () => PlanetDto, {
  disableRemove: true,
})
export class FocusDto extends BaseDto {
  @Field(() => [String], {
    nullable: true,
  })
  events!: string[];
}
