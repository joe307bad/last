import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      {
        driver: ApolloGatewayDriver,
        server: {
          cors: true,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose(
            {
              subgraphs: [
                {
                  name: 'maps',
                  url: 'http://localhost:3081/graphql',
                },
                {
                  name: 'planets',
                  url: 'http://localhost:3333/graphql',
                },
              ],
            }
          ),
        },
      }
    ),
  ],
})
export class AppModule {}
