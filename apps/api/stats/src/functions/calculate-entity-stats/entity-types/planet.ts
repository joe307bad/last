import got from 'got';
import { PlanetStoryEventResponse } from '@last/shared/types';
// nx calculateEntityStats api-stats --data="[\"59698166-27c0-492f-9c0a-85a27113939f\", \"planet\"]"
export const calculatePlanetStats = async (
  planetId: string
) => {
  const planetEvents = await got
    .get(
      `http://localhost:3077/api/story-event/entity/${planetId}`
    )
    .json<PlanetStoryEventResponse>();

  const planetInfo = await got
    .post('http://localhost:3333/graphql', {
      json: {
        query: `{ planet(id: "${planetId}") { name }}`,
      },
    })
    .json<{
      data: { planet: { name: string } };
    }>();
  debugger;

  return {};
};
