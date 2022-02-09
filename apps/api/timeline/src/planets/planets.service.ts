import { Injectable } from '@nestjs/common';
import { CreatePlanetInput } from './dto/create-planet.input';
import { UpdatePlanetInput } from './dto/update-planet.input';

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Planet } from "./entities/planet.entity";

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>
  ){}

  async create(createPlanetInput: CreatePlanetInput) {
    const p = this.planetRepository.create(createPlanetInput);
    await this.planetRepository.save(p)
    return p;
  }

  findAll() {
    return this.planetRepository.find();
  }

  findOne(id: number) {
    return this.planetRepository.findOne(id)
  }

  update(id: string, updatePlanetInput: UpdatePlanetInput) {
    return this.planetRepository.save(updatePlanetInput)
  }

  remove(id: number) {
    return `This action removes a #${id} planet`;
  }
}
