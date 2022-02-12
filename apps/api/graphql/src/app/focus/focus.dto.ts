import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '../base.dto';
import { UnPagedRelation } from '@nestjs-query/query-graphql';
import { PlanetDto } from '../planet/planet.dto';

@ObjectType('Focus')
@UnPagedRelation('planets', () => PlanetDto, { disableRemove: true })
export class FocusDto extends BaseDto {}
