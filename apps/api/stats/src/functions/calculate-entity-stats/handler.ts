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
    event.body as unknown as [
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
        return await calculatePlanetStats(
          entityId
        );
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

  await (async () => {
    switch (entityType) {
      case 'planet':
        return upsertStatsEntry({
          resources: entityStats.resources,
        });
    }
  })().then(() => {
    return got
      .post(
        `http://localhost:3077/api/emit-stats`,
        {
          json: entityStats,
        }
      )
      .json<any>();
  });

  return formatJSONResponse({ entityStats });
};

export const main = middyfy(calculateEntityStats);
