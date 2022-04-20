import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MapModule } from './map/map.module';

interface HeadersContainer {
  headers?: Record<string, string>;
}
interface ContextArgs {
  req?: HeadersContainer;
  connection?: { context: HeadersContainer };
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: false,
    }),
    AuthModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
