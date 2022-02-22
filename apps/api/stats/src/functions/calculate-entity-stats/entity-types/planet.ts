import got from 'got';
import { PlanetStoryEventResponse } from '@last/shared/types';
import { evaluate, parse } from 'mathjs';

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

  const plantInfoQuery = `
  query {
    planet(
      id: "${planetId}"
    ) {
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

  const planetInfo = await got
    .post('http://localhost:3333/graphql', {
      json: {
        query: plantInfoQuery,
      },
    })
    .json<{
      data: {
        planet: {
          name: string;
          planetResources: {
            initialAmount: number;
            resource: {
              name: string;
              id: string;
            };
          }[];
        };
      };
    }>();

  if (planetInfo.data === null) {
    throw new Error(
      `No planet data found for ${planetId} from api-graphql`
    );
  }

  const stats = planetEvents.docs.reduce(
    (acc, planetEvent) => {
      switch (planetEvent.eventType) {
        case 'resource_boon':
          const { initialAmount, resource } =
            planetInfo.data.planet.planetResources.find(
              (pr) =>
                pr.resource.id ===
                planetEvent.secondaryEntityId
            ) || {};

          if (!initialAmount || !resource) {
            throw new Error(
              `This resource: ${planetEvent.secondaryEntityId} was not found for this planet ${planetEvent.entityId}`
            );
          }
          const resourceExistsInStats =
            acc.resources.has(resource.id);

          if (!resourceExistsInStats) {
            acc.resources.set(
              resource.id,
              evaluate(
                parse(
                  `${initialAmount}${planetEvent.valueChange}`
                ).toString()
              )
            );
          } else {
            acc.resources.set(
              resource.id,
              evaluate(
                parse(
                  `${acc.resources.get(
                    resource.id
                  )}${planetEvent.valueChange}`
                ).toString()
              )
            );
          }
          break;
      }

      return acc;
    },
    { resources: new Map() }
  );

  return {
    resources: Array.from(stats.resources),
  };
};
