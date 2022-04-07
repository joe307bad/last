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

class BaseService {
  constructor(private _serviceUrl: string) {}

  post(data: any) {
    return got.post(
      'http://localhost:3333/graphql',
      {
        json: data,
      }
    );
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

/**
 * TODO I donn't think tsyringe is compatible with browser's which is why uncommenting
 * autoInjectable and attempting to use it will throw an error when trying to load the web app
 * perhaps https://inversify.io/ would work better
 */
@autoInjectable()
class GraphQlService extends BaseService {
  constructor() {
    // private _env?: EnvironmentService // @inject('EnvironmentService')
    super(
      // _env.getServiceConfiguration()
      //   .graphql_service_url
      ''
    );
  }

  getAllPlanets(): Promise<AllPlanetsResponse> {
    //   graphql_service_url:
    //     'http://localhost:3333/graphql',
    // }
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

const services = (
  serviceConfig: ServiceConfiguration
) => {
  // container.register(
  //   'EnvironmentService',
  //   EnvironmentService
  // );
  //
  // container.register('EnvironmentService', {
  //   useFactory:
  //     instanceCachingFactory<EnvironmentService>(
  //       () => {
  //         return new EnvironmentService(
  //           serviceConfig
  //         );
  //       }
  //     ),
  // });
  //
  // container.register(
  //   'GraphQlService',
  //   GraphQlService
  // );

  return {
    service: {
      graphql: new GraphQlService(),
    },
  };
};

export { services };
