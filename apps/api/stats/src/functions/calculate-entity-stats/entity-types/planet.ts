import got from 'got';
import {
  EventTypes,
  PlanetStoryEventResponse,
} from '~last/shared/types';
import { getPlanetById } from '~last/request/node';
import { parseResourceChange } from '../event-types/resource-change';

export const calculatePlanetStats = async (
  planetId: string
) => {
  const planetEvents = await got
    .get(
      `http://localhost:3077/api/story-event/entity/${planetId}`
    )
    .json<PlanetStoryEventResponse>();

  if (planetEvents.docs.length === 0) {
    throw new Error(
      `No planet events found for ${planetId} from api-story`
    );
  }

  const planetInfo = await getPlanetById(planetId);

  if (!planetInfo?.data?.planet) {
    throw new Error(
      `No planet data found for ${planetId} from api-graphql`
    );
  }

  const stats = planetEvents.docs.reduce(
    (acc, planetEvent) => {
      switch (planetEvent.eventType) {
        case EventTypes.resource_change:
          acc.resources = parseResourceChange(
            acc.resources,
            planetInfo,
            planetEvent
          );
          break;
      }

      return acc;
    },
    { resources: new Map() }
  );

  return {
    planetId,
    resources: Array.from<[string, number]>(
      stats.resources
    ),
  };
};
