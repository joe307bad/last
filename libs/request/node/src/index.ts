import registryFactory from '~last/request/core';

export * from './lib/getAllPlanets';
export * from './lib/getPlanetById';
export * from './lib/resourceChangeByPlanetId';
export * from './lib/createManyMaps';
export * from './lib/getMapById';
export * from './lib/saveMapState';

export default registryFactory({
  graphql_service_url:
    'http://localhost:3333/graphql',
});
