import { autoInjectable, inject } from 'tsyringe';
import { AllPlanetsResponse } from '~last/shared/types';
import getAllPlanets from '../graphql/queries/getAllPlanets.query';
import { IHttpService } from '../IHttpService';

@autoInjectable()
export class GraphQlService {
  constructor(
    @inject('HttpService')
    private _http?: IHttpService<any>
  ) {}

  getAllPlanets(): Promise<AllPlanetsResponse> {
    return this._http.qlQuery(getAllPlanets);
  }
}
