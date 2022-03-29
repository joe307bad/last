import got from 'got';
import { SaveMapStateRequest } from '~last/shared/types';

export const saveMapState = (
  saveMapStateRequest: SaveMapStateRequest
) => {
  return got
    .post(`http://localhost:3080/api/map`, {
      json: saveMapStateRequest,
    })
    .json<{ id: string }[]>();
};
