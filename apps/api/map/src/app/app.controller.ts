import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { AppService } from './app.service';
import { NewMapRequestDto } from './dto/NewMapRequest';
import { SaveMapStateRequest } from '~last/shared/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get('/create-many-maps')
  createManyMaps(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        forbidNonWhitelisted: true,
      })
    )
    query: NewMapRequestDto
  ) {
    const {
      height,
      width,
      numberOfRegions,
      numberOfMaps,
    } = query;
    return this.appService.createManyMaps(
      height,
      width,
      numberOfRegions,
      numberOfMaps
    );
  }

  @Get('/map/:id')
  getMapById(@Param() params: { id: string }) {
    return this.appService.getMapById(params.id);
  }

  @Post('/map')
  saveMapState(
    @Body() mapState: SaveMapStateRequest
  ) {
    return this.appService.saveMapState(mapState);
  }
}
