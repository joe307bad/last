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
        }
      }
    }
  }
 `;

    const planets = await got
      .post('http://localhost:3333/graphql', {
        json: {
          query: plantInfoQuery,
        },
      })
      .json<AllPlanetsResponse>();
    return planets;
  };
