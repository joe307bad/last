import 'reflect-metadata';
import {
  request as r,
  ServiceConfiguration,
} from '~last/request/core';
import { HttpService } from '~last/request/node';
const serviceConfiguration: ServiceConfiguration =
  {
    graphql_service_url:
      "http://localhost:3333/graphql",
  };

export const request = r(
  () =>
    new HttpService(
      serviceConfiguration.graphql_service_url
    )
);
