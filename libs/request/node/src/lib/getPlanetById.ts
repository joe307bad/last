import got from 'got';
import { Planet } from '~last/shared/types';

export const getPlanetById = (
  planetId: string
) => {
  const plantInfoQuery = `
  query {
    planet(
      id: "${planetId}"
    ) {
      id,
      name,
      planetResources {
        initialAmount
        resource {
          id
          name
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
    .json<{
      data: {
        planet: Partial<Planet>;
      };
    }>();
};
