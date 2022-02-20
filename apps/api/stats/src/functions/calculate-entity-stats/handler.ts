import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { createPlanetStoryEvent } from '@functions/calculate-entity-stats/entity-types/planet';

const calculateEntityStats: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const [entityId, entityType] =
    event as unknown as [
      string,
      (
        | 'planet'
        | 'planetarySystem'
        | 'house'
        | 'character'
      )
    ];
  switch (entityType) {
    case 'planet':
      return formatJSONResponse({
        planets: await createPlanetStoryEvent(entityId),
      });
      break;
  }
};

export const main = middyfy(calculateEntityStats);
