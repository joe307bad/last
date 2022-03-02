import { Planet } from '~last/shared/types';

export type AllPlanetsResponse = {
  data: {
    planets: {
      edges: {
        node: Planet;
      }[];
    };
  };
};
