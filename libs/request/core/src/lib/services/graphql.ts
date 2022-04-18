import { autoInjectable, inject } from 'tsyringe';
import { AllPlanetsResponse } from '~last/shared/types';
import { gql } from 'graphql-tag';
import { IHttpService } from '../IHttpService';

const query = gql`
  {
    planets(paging: { first: 100 }) {
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

@autoInjectable()
export class GraphQlService {
  constructor(
    @inject('HttpService')
    private _http?: IHttpService<any>
  ) {}

  getAllPlanets(): Promise<AllPlanetsResponse> {
    return this._http.query(query);

    // TODO along with using the `as`
    // keyword here, I would also like to see
    // something like a runtime json parser like io-ts
    // https://medium.com/swlh/typescript-runtime-validation-with-io-ts-456f095b7f86
    // return this._http.post({
    //   query: plantInfoQuery,
    // }) as Promise<AllPlanetsResponse>;
  }
}
