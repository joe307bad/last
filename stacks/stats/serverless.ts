import { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';

const serverlessConfiguration: AWS = {
  ...baseServerlessConfiguration,
  service: 'stats',
  functions: {
    hello: {
      handler: 'src/handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
