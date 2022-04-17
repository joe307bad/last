import { container } from 'tsyringe';
import { GraphQlService } from './services/graphql';
import { IHttpService } from './IHttpService';
import { HttpService } from '~last/request/node';

export type ServiceConfiguration = {
  graphql_service_url?: string;
  map_service_url?: string;
  stats_service_url?: string;
  story_service_url?: string;
};

const request = (
  httpServiceFactory: () => IHttpService<any>
) => {
  container.register('HttpService', {
    useValue: httpServiceFactory(),
  });

  container.register(
    'GraphQlService',
    GraphQlService
  );

  return {
    graphql: new GraphQlService(),
  };
};

export { request };
