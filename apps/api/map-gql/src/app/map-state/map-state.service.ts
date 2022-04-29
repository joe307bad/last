import {
  DeepPartial,
  DeleteManyResponse,
  Filter,
  NoOpQueryService,
  Query,
  UpdateManyResponse,
} from '@nestjs-query/core';
import { MapStateDto } from './map-state.dto';
import {
  InjectRepository,
  Repository,
} from 'nest-couchdb';
import { MapStateEntity } from './map-state.entity';
import { Injectable } from '@nestjs/common';
import { filterToMango } from '~last/query-nano';

@Injectable()
export class MapStateService extends NoOpQueryService<MapStateDto> {
  constructor(
    @InjectRepository(MapStateEntity)
    private readonly mapStateRepo: Repository<MapStateEntity>
  ) {
    super();
  }

  createOne({
    name: title,
    isCompleted: completed,
  }: any): Promise<MapStateDto> {
    return Promise.resolve({} as MapStateDto);
  }

  createMany(items: any[]): Promise<MapStateDto[]> {
    return Promise.resolve([]);
  }

  query(query: Query<MapStateDto>): Promise<MapStateDto[]> {
    // TODO we dont get paging or sorting out of the box here
    // that would all have to be implemented in this method
    return this.mapStateRepo
      .find({
        selector: filterToMango(query.filter),
      })
      .then((res) => {
        return res.docs;
      }) as unknown as Promise<MapStateDto[]>;
  }

  findById(
    id: string
  ): Promise<MapStateDto | undefined> {
    return this.mapStateRepo.get(id);
  }

  getById(id: string | number): Promise<MapStateDto> {
    return Promise.resolve({} as MapStateDto);
  }

  updateMany(
    update: DeepPartial<MapStateDto>,
    filter: Filter<MapStateDto>
  ): Promise<UpdateManyResponse> {
    return Promise.resolve({} as any);
  }

  updateOne(
    id: string | number,
    update: DeepPartial<MapStateDto>
  ): Promise<MapStateDto> {
    return Promise.resolve({} as MapStateDto);
  }

  deleteMany(
    filter: Filter<MapStateDto>
  ): Promise<DeleteManyResponse> {
    return Promise.resolve({} as any);
  }

  deleteOne(
    id: string | number
  ): Promise<MapStateDto> {
    return Promise.resolve({} as MapStateDto);
  }
}
