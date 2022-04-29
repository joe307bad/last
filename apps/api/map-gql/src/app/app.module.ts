import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { MapModule } from './map/map.module';
import { MapStateModule } from './map-state/map-state.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: false,
    }),
    AuthModule,
    MapModule,
    MapStateModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
