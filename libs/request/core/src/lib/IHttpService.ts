export interface IHttpService<T> {
  post(data: any): Promise<any>;
  query(
    query?: any,
    variables?: Record<string, string>
  ): Promise<any>;
}
