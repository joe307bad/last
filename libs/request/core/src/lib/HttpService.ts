export interface IHttpService<T> {
  post(data: any): Promise<any>;
}
