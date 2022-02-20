import got from 'got';
import { PlanetStoryEvent } from '@last/shared/types';
// nx serve api-stats --data="[\"59698166-27c0-492f-9c0a-85a27113939f\", \"planet\"]"
export const calculatePlanetStats = async (
  planetId: string
) => {
  debugger;
  console.log(planetId);

  const planetEvents = got.get(
    `http://localhost:3077/api/story-event/entity/${planetId}`
  ).json<PlanetStoryEvent>();

  return got
    .post('http://localhost:3333/graphql', {
      json: {
        query: `{ planet(id: "${planetId}") { name }}`,
      },
    })
    .json();
};
