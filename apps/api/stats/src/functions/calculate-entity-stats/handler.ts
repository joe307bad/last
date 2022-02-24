import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import schema from './schema';
import { calculatePlanetStats } from './entity-types/planet';
import got from 'got';

const calculateEntityStats: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event, _context, _callback) => {
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

  const entityStats = await (async () => {
    switch (entityType) {
      case 'planet':
        return {
          planet: await calculatePlanetStats(
            entityId
          ), //.catch((e) => callback(e, null)),
        };
    }
  })();

  const upsertStatsEntry = (stats) => {
    return got
      .post(`http://localhost:3077/api/stats`, {
        json: [
          {
            entityId,
            stats: JSON.stringify(stats),
          },
        ],
      })
      .json<any>();
  };

  switch (entityType) {
    case 'planet':
      await upsertStatsEntry({
        resources: entityStats.planet.resources,
      });
      break;
  }

  return formatJSONResponse({ entityStats });
};

export const main = middyfy(calculateEntityStats);
