import got from 'got';

export const resourceChangeByPlanetId = (
  planetId: string,
  resourceId: string
) => {
  return got
    .post('http://localhost:3077/api', {
      json: [
        {
          entityId: planetId,
          entityType: 'planet',
          eventType: 'resource_change',
          valueChange: -1,
          secondaryEntityId: resourceId,
        },
      ],
    })
    .json<any>();
};
