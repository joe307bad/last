import { Controller, Get } from '@nestjs/common';

import { GeneratorService } from './generator/generator.service';

@Controller()
export class AppController {
  constructor(
    private readonly generatorService: GeneratorService
  ) {}

  @Get()
  getData() {
    return this.generatorService.createPlanets();
  }
}
