import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { PlanetsResolver } from '../planets/planets.resolver';
import { PlanetsService } from '../planets/planets.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Planet } from '../planets/entities/planet.entity';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'last',
      entities: [Planet],
      synchronize: true,
      dropSchema: true
    }),
    PlanetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
