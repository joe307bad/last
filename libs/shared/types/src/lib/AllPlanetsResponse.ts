import { Planet } from '~last/shared/types';

export type AllPlanetsResponse = {
  planets: {
    edges: {
      node: Planet;
    }[];
  };
};
