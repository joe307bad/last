import got from 'got';
import { MapResponse } from '~last/shared/types';

export const getMapById = (mapId: string) => {
  return got
    .get(`http://localhost:3080/api/map/${mapId}`)
    .json<MapResponse>();
};
