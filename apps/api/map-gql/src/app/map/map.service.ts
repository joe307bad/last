import {
  DeepPartial,
  DeleteManyResponse,
  Filter,
  NoOpQueryService,
  Query,
  UpdateManyResponse,
} from '@nestjs-query/core';
import { MapDto } from './map.dto';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { MapEntity } from './map.entity';
import { Injectable } from '@nestjs/common';
import { filterToMango } from '~last/query-nano';

@Injectable()
export class MapService extends NoOpQueryService<MapDto> {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepo: Repository<MapEntity>
  ) {
    super();
  }

  createOne({
    name: title,
    isCompleted: completed,
  }: any): Promise<MapDto> {
    return Promise.resolve({} as MapDto);
  }

  createMany(items: any[]): Promise<MapDto[]> {
    return Promise.resolve([]);
  }

  query(query: Query<MapDto>): Promise<MapDto[]> {
    // TODO we dont get paging or sorting out of the box here
    // that would all have to be implemented in this method
    return this.mapRepo
      .find({
        selector: filterToMango(query.filter),
      })
      .then((res) => {
        return res.docs;
      }) as unknown as Promise<MapDto[]>;
  }

  findById(
    id: string | number
  ): Promise<MapDto | undefined> {
    return Promise.resolve({} as MapDto);
  }

  getById(id: string | number): Promise<MapDto> {
    return Promise.resolve({} as MapDto);
  }

  updateMany(
    update: DeepPartial<MapDto>,
    filter: Filter<MapDto>
  ): Promise<UpdateManyResponse> {
    return Promise.resolve({} as any);
  }

  updateOne(
    id: string | number,
    update: DeepPartial<MapDto>
  ): Promise<MapDto> {
    return Promise.resolve({} as MapDto);
  }

  deleteMany(
    filter: Filter<MapDto>
  ): Promise<DeleteManyResponse> {
    return Promise.resolve({} as any);
  }

  deleteOne(
    id: string | number
  ): Promise<MapDto> {
    return Promise.resolve({} as MapDto);
  }
}
