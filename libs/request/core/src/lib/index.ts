import 'reflect-metadata';

import {
  autoInjectable,
  container,
  inject,
  instanceCachingFactory,
} from 'tsyringe';
import got from 'got';
import { AllPlanetsResponse } from '~last/shared/types';

type ServiceConfiguration = {
  graphql_service_url?: string;
  map_service_url?: string;
  stats_service_url?: string;
  story_service_url?: string;
};

/**
 * TODO the implementation of this base service should
 * be platform specific. the interface is generic, but
 * the implementation would use got for node and ky for
 * browser based
 */
class BaseService {
  constructor(private _serviceUrl: string) {}

  post(data: any) {
    return got.post(this._serviceUrl, {
      json: data,
    });
  }
}

class EnvironmentService {
  constructor(
    private _serviceConfig: ServiceConfiguration
  ) {}

  getServiceConfiguration() {
    return this._serviceConfig;
  }
}

@autoInjectable()
class GraphQlService extends BaseService {
  constructor(
    @inject('EnvironmentService')
    private _env?: EnvironmentService
  ) {
    super(
      _env.getServiceConfiguration()
        .graphql_service_url
    );
  }

  getAllPlanets(): Promise<AllPlanetsResponse> {
    const plantInfoQuery = `
query {
  planets(paging: {first:100}) {
    edges {
      node {
        id
        name
        description
        enabled
        created
        updated
        initialAlignment
        population
        level
        mapId
        planetarySystem {
          name
        }
        rulingHouse {
          name
        }
        houses {
          name
        }
        foci {
          name
        }
        colors {
          hex
        }
        terrains {
          name
        }
        planetResources {
          initialAmount
          resource {
            name
          }
        }
      }
    }
  }
}
 `;

    return this.post({
      query: plantInfoQuery,
    }).json<AllPlanetsResponse>();
  }
}

const request = (
  serviceConfig: ServiceConfiguration
) => {
  container.register(
    'EnvironmentService',
    EnvironmentService
  );

  container.register('EnvironmentService', {
    useFactory:
      instanceCachingFactory<EnvironmentService>(
        () => {
          return new EnvironmentService(
            serviceConfig
          );
        }
      ),
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
