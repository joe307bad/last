export interface IHttpService<T> {
  post(data: any): Promise<any>;
  qlQuery(
    query?: any,
    variables?: Record<string, string>
  ): Promise<any>;
}
