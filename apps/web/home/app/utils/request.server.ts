import { services } from '~last/request/core';
export const allPlanets = () =>
  services({
    graphql_service_url:
      'http://localhost:3333/graphql',
  }).service.graphql.getAllPlanets();
