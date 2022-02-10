import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [PlanetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
