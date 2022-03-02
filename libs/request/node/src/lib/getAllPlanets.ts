import got from 'got';
import { AllPlanetsResponse } from '~last/shared/types';

export const getAllPlanets =
  async (): Promise<AllPlanetsResponse> => {
    const plantInfoQuery = `
query {
  planets {
    edges {
      node {
        id
        name
        description
        enabled
        created
        updated
        initialAlignment
        population
        level
        planetarySystem {
          name
        }
        rulingHouse {
          name
        }
        houses {
          name
        }
        foci {
          name
        }
        colors {
          hex
        }
        terrains {
          name
        }
        planetResources {
          name
        }
      }
    }
  }
}
 `;

    return got
      .post('http://localhost:3333/graphql', {
        json: {
          query: plantInfoQuery,
        },
      })
      .json<AllPlanetsResponse>();
  };
