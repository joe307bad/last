import got from 'got';
import { IHttpService } from '~last/request/core';

/**
 * TODO the implementation of this base service should
 * be platform specific. the interface is generic, but
 * the implementation would use got for node and ky for
 * browser based
 */
export class HttpService
  implements IHttpService<any>
{
  constructor(private _serviceUrl: string) {
    return this;
  }

  post(data: any) {
    return got
      .post(this._serviceUrl, {
        json: data,
      })
      .json();
  }
}
