import got from 'got';
import { IHttpService } from '~last/request/core';
import {
  GraphQLClient,
  gql,
} from 'graphql-request';

/**
 * TODO the implementation of this base service should
 * be platform specific. the interface is generic, but
 * the implementation would use got for node and ky for
 * browser based
 */
export class HttpService
  implements IHttpService<any>
{
  private _graphqlClient: GraphQLClient | null =
    null;

  constructor(private _serviceUrl: string) {
    this._graphqlClient = new GraphQLClient(
      this._serviceUrl,
      {
        headers: {
          authorization: 'Bearer MY_TOKEN',
        },
      }
    );
    return this;
  }

  query(
    query?: any,
    variables?: Record<string, string>
  ): Promise<any> {
    return this._graphqlClient.request(query);
  }

  post(data: any) {
    return got
      .post(this._serviceUrl, {
        json: data,
      })
      .json();
  }
}
